import type { HttpContext } from '@adonisjs/core/http'
import SocietyImage from '#models/society_image'
import SendResponse from '#helpers/send_response_helper'
import {
  createSocietyImageValidator,
  updateSocietyImageValidator,
} from '#validators/society_image_validator'

export default class SocietyImagesController {
  async index({ request, response }: HttpContext) {
    try {
      const societyId = request.qs().societyId
      const images = societyId
        ? await SocietyImage.query().where('society_id', societyId).preload('uploadedBy')
        : await SocietyImage.query().preload('uploadedBy')

      return response.ok(SendResponse.success('Society images fetched', images))
    } catch (error) {
      return response.internalServerError(
        SendResponse.error('Error fetching society images', 500, error.message)
      )
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const image = await SocietyImage.findOrFail(params.id)
      await image.load('society')
      await image.load('uploadedBy')

      return response.ok(SendResponse.success('Society image found', image))
    } catch (error) {
      return response.internalServerError(
        SendResponse.error('Error fetching society image', 500, error.message)
      )
    }
  }

  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(createSocietyImageValidator)

    try {
      const image = await SocietyImage.create(data)
      return response.created(SendResponse.success('Society image created', image))
    } catch (error) {
      return response.internalServerError(
        SendResponse.error('Error creating society image', 500, error.message)
      )
    }
  }

  async update({ params, request, response }: HttpContext) {
    const data = await request.validateUsing(updateSocietyImageValidator)

    try {
      const image = await SocietyImage.findOrFail(params.id)
      image.merge(data)
      await image.save()

      return response.ok(SendResponse.success('Society image updated', image))
    } catch (error) {
      return response.internalServerError(
        SendResponse.error('Error updating society image', 500, error.message)
      )
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const image = await SocietyImage.findOrFail(params.id)
      await image.delete()

      return response.ok(SendResponse.success('Society image deleted', image))
    } catch (error) {
      return response.internalServerError(
        SendResponse.error('Error deleting society image', 500, error.message)
      )
    }
  }
}

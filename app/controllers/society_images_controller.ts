import SocietyImage from '#models/society_image'
import { createSocietyImageValidator } from '#validators/society_image_validator'
import SendResponse from '#helpers/send_response_helper'
import type { HttpContext } from '@adonisjs/core/http'

export default class SocietyImagesController {
  async store({ request, response, auth }: HttpContext) {
    try {
      const payload = await request.validateUsing(createSocietyImageValidator)
      const user = auth.user!

      const image = await SocietyImage.create({
        ...payload,
        uploadedById: user.id,
      })

      return response.status(201).send(SendResponse.success('Image uploaded successfully', image))
    } catch (error) {
      return response
        .status(500)
        .send(SendResponse.error('Failed to upload image', 500, error.message))
    }
  }

  async index({ params, response }: HttpContext) {
    try {
      const images = await SocietyImage.query()
        .where('society_id', params.societyId)
        .preload('society')
        .preload('uploadedBy')

      return response.status(200).send(SendResponse.success('Images fetched successfully', images))
    } catch (error) {
      return response
        .status(500)
        .send(SendResponse.error('Failed to fetch images', 500, error.message))
    }
  }
}

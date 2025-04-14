import type { HttpContext } from '@adonisjs/core/http'
import SocietyFlat from '#models/society_flat'
import SendResponse from '#helpers/send_response_helper'
import {
  createSocietyFlatValidator,
  updateSocietyFlatValidator,
} from '#validators/society_flat_validator'

export default class SocietyFlatsController {
  async index({ response }: HttpContext) {
    try {
      const flats = await SocietyFlat.query().preload('society').preload('block')
      return response.ok(SendResponse.success('Flats fetched successfully', flats))
    } catch (error) {
      return response.internalServerError(
        SendResponse.error('Error fetching flats', 500, error.message)
      )
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const flat = await SocietyFlat.findOrFail(params.id)
      await flat.load('society')
      await flat.load('block')
      return response.ok(SendResponse.success('Flat fetched successfully', flat))
    } catch (error) {
      return response.internalServerError(
        SendResponse.error('Error fetching flat', 500, error.message)
      )
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(createSocietyFlatValidator)
      const flat = await SocietyFlat.create(data)
      return response.created(SendResponse.success('Flat created successfully', flat))
    } catch (error) {
      return response.internalServerError(
        SendResponse.error('Error creating flat', 500, error.message)
      )
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(updateSocietyFlatValidator)
      const flat = await SocietyFlat.findOrFail(params.id)
      flat.merge(data)
      await flat.save()
      return response.ok(SendResponse.success('Flat updated successfully', flat))
    } catch (error) {
      return response.internalServerError(
        SendResponse.error('Error updating flat', 500, error.message)
      )
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const flat = await SocietyFlat.findOrFail(params.id)
      await flat.delete()
      return response.ok(SendResponse.success('Flat deleted successfully', flat))
    } catch (error) {
      return response.internalServerError(
        SendResponse.error('Error deleting flat', 500, error.message)
      )
    }
  }
}

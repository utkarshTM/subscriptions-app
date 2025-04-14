import type { HttpContext } from '@adonisjs/core/http'
import SocietyAmenity from '#models/society_amenity'
import SendResponse from '#helpers/send_response_helper'
import {
  createSocietyAmenityValidator,
  updateSocietyAmenityValidator,
} from '#validators/society_amenity_validator'

export default class SocietyAmenitiesController {
  async index({ response }: HttpContext) {
    try {
      const amenities = await SocietyAmenity.query().preload('society')
      return response.ok(SendResponse.success('Amenities fetched successfully', amenities))
    } catch (error) {
      return response.internalServerError(
        SendResponse.error('Error fetching amenities', 500, error.message)
      )
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const amenity = await SocietyAmenity.findOrFail(params.id)
      await amenity.load('society')
      return response.ok(SendResponse.success('Amenity fetched successfully', amenity))
    } catch (error) {
      return response.internalServerError(
        SendResponse.error('Error fetching amenity', 500, error.message)
      )
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(createSocietyAmenityValidator)
      const amenity = await SocietyAmenity.create(data)
      return response.created(SendResponse.success('Amenity created successfully', amenity))
    } catch (error) {
      return response.internalServerError(
        SendResponse.error('Error creating amenity', 500, error.message)
      )
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(updateSocietyAmenityValidator)
      const amenity = await SocietyAmenity.findOrFail(params.id)
      amenity.merge(data)
      await amenity.save()
      return response.ok(SendResponse.success('Amenity updated successfully', amenity))
    } catch (error) {
      return response.internalServerError(
        SendResponse.error('Error updating amenity', 500, error.message)
      )
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const amenity = await SocietyAmenity.findOrFail(params.id)
      await amenity.delete()
      return response.ok(SendResponse.success('Amenity deleted successfully', amenity))
    } catch (error) {
      return response.internalServerError(
        SendResponse.error('Error deleting amenity', 500, error.message)
      )
    }
  }
}

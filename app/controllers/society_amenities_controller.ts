import SocietyAmenity from '#models/society_amenity'
import SendResponse from '#helpers/send_response_helper'
import type { HttpContext } from '@adonisjs/core/http'

export default class SocietyAmenitiesController {
  /**
   * List all amenities for a society
   */
  async index({ params, response }: HttpContext) {
    try {
      const amenities = await SocietyAmenity.query()
        .where('society_id', params.societyId)
        .preload('society')

      return response
        .status(200)
        .send(SendResponse.success('Amenities fetched successfully', amenities))
    } catch (error) {
      return response
        .status(500)
        .send(SendResponse.error('Failed to fetch amenities', 500, error.message))
    }
  }

  /**
   * Get a single amenity
   */
  async show({ params, response }: HttpContext) {
    try {
      const amenity = await SocietyAmenity.findOrFail(params.id)
      await amenity.load('society')

      return response
        .status(200)
        .send(SendResponse.success('Amenity fetched successfully', amenity))
    } catch (error) {
      return response
        .status(500)
        .send(SendResponse.error('Failed to fetch amenity', 500, error.message))
    }
  }
}

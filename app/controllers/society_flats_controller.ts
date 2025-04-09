import SocietyFlat from '#models/society_flat'
import SendResponse from '#helpers/send_response_helper'
import type { HttpContext } from '@adonisjs/core/http'

export default class SocietyFlatsController {
  /**
   * List all flats in a block
   */
  async index({ params, response }: HttpContext) {
    try {
      const flats = await SocietyFlat.query()
        .where('block_id', params.blockId)
        .preload('society')
        .preload('block')

      return response.status(200).send(SendResponse.success('Flats fetched successfully', flats))
    } catch (error) {
      return response
        .status(500)
        .send(SendResponse.error('Failed to fetch flats', 500, error.message))
    }
  }

  /**
   * Get a single flat
   */
  async show({ params, response }: HttpContext) {
    try {
      const flat = await SocietyFlat.findOrFail(params.id)
      await flat.load('society')
      await flat.load('block')

      return response.status(200).send(SendResponse.success('Flat fetched successfully', flat))
    } catch (error) {
      return response
        .status(500)
        .send(SendResponse.error('Failed to fetch flat', 500, error.message))
    }
  }
}

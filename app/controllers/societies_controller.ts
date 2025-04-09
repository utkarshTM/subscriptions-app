import Society from '#models/society'
import { createSocietyValidator } from '#validators/society_validator'
import SendResponse from '#helpers/send_response_helper'
import type { HttpContext } from '@adonisjs/core/http'

export default class SocietiesController {
  /**
   * Create a new society
   */
  async store({ request, response, auth }: HttpContext) {
    try {
      const payload = await request.validateUsing(createSocietyValidator)
      const user = auth.user

      if (!user) {
        return response.unauthorized(SendResponse.error('Unauthorized', 401))
      }

      const society = new Society()
      society.name = payload.name
      society.address = payload.address
      society.registrationNumber = payload.registrationNumber
      society.userId = user.id
      await society.save()

      return response
        .status(201)
        .send(SendResponse.success('Society created successfully', society))
    } catch (error) {
      return response
        .status(500)
        .send(SendResponse.error('Failed to create society', 500, error.message))
    }
  }

  /**
   * List all societies
   */
  async index({ response }: HttpContext) {
    try {
      const societies = await Society.query().preload('user')
      return response
        .status(200)
        .send(SendResponse.success('Societies fetched successfully', societies))
    } catch (error) {
      return response
        .status(500)
        .send(SendResponse.error('Failed to fetch societies', 500, error.message))
    }
  }

  /**
   * Get a single society
   */
  async show({ params, response }: HttpContext) {
    try {
      const society = await Society.findOrFail(params.id)
      await society.load('user')
      return response
        .status(200)
        .send(SendResponse.success('Society fetched successfully', society))
    } catch (error) {
      return response
        .status(500)
        .send(SendResponse.error('Failed to fetch society', 500, error.message))
    }
  }
}

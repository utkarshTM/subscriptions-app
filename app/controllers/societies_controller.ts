import type { HttpContext } from '@adonisjs/core/http'
import Society from '#models/society'
import SendResponse from '#helpers/send_response_helper'
import { createSocietyValidator, updateSocietyValidator } from '#validators/society_validator'

export default class SocietiesController {
  // GET /societies
  async index({ response }: HttpContext) {
    try {
      const societies = await Society.query().preload('user')
      return response.ok(SendResponse.success('Societies fetched successfully', societies))
    } catch (error) {
      return response.internalServerError(
        SendResponse.error('Failed to fetch societies', 500, error.message)
      )
    }
  }

  // GET /societies/:id
  async show({ params, response }: HttpContext) {
    try {
      const society = await Society.findOrFail(params.id)
      await society.load('user')
      return response.ok(SendResponse.success('Society fetched successfully', society))
    } catch (error) {
      return response.internalServerError(
        SendResponse.error('Failed to fetch society', 500, error.message)
      )
    }
  }

  // POST /societies
  async store({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(createSocietyValidator)
      const society = await Society.create(data)
      return response.created(SendResponse.success('Society created successfully', society))
    } catch (error) {
      return response.internalServerError(
        SendResponse.error('Failed to create society', 500, error.message)
      )
    }
  }

  // PUT /societies/:id
  async update({ params, request, response }: HttpContext) {
    try {
      const society = await Society.findOrFail(params.id)
      const data = await request.validateUsing(updateSocietyValidator)
      society.merge(data)
      await society.save()
      return response.ok(SendResponse.success('Society updated successfully', society))
    } catch (error) {
      return response.internalServerError(
        SendResponse.error('Failed to update society', 500, error.message)
      )
    }
  }

  // DELETE /societies/:id
  async destroy({ params, response }: HttpContext) {
    try {
      const society = await Society.findOrFail(params.id)
      await society.delete()
      return response.ok(SendResponse.success('Society deleted successfully', society))
    } catch (error) {
      return response.internalServerError(
        SendResponse.error('Failed to delete society', 500, error.message)
      )
    }
  }
}

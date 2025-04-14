import type { HttpContext } from '@adonisjs/core/http'
import SocietyBlock from '#models/society_block'
import SendResponse from '#helpers/send_response_helper'
import {
  createSocietyBlockValidator,
  updateSocietyBlockValidator,
} from '#validators/society_block_validator'

export default class SocietyBlocksController {
  async index({ response }: HttpContext) {
    try {
      const blocks = await SocietyBlock.query().preload('society')
      return response.ok(SendResponse.success('Blocks fetched successfully', blocks))
    } catch (error) {
      return response.internalServerError(
        SendResponse.error('Error fetching blocks', 500, error.message)
      )
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const block = await SocietyBlock.findOrFail(params.id)
      await block.load('society')
      return response.ok(SendResponse.success('Block fetched successfully', block))
    } catch (error) {
      return response.internalServerError(
        SendResponse.error('Error fetching block', 500, error.message)
      )
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(createSocietyBlockValidator)
      const block = await SocietyBlock.create(data)
      return response.created(SendResponse.success('Block created successfully', block))
    } catch (error) {
      return response.internalServerError(
        SendResponse.error('Error creating block', 500, error.message)
      )
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(updateSocietyBlockValidator)
      const block = await SocietyBlock.findOrFail(params.id)
      block.merge(data)
      await block.save()
      return response.ok(SendResponse.success('Block updated successfully', block))
    } catch (error) {
      return response.internalServerError(
        SendResponse.error('Error updating block', 500, error.message)
      )
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const block = await SocietyBlock.findOrFail(params.id)
      await block.delete()
      return response.ok(SendResponse.success('Block deleted successfully', block))
    } catch (error) {
      return response.internalServerError(
        SendResponse.error('Error deleting block', 500, error.message)
      )
    }
  }
}

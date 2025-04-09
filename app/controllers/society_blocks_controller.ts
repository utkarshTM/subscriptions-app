import SocietyBlock from '#models/society_block'
import SendResponse from '#helpers/send_response_helper'
import type { HttpContext } from '@adonisjs/core/http'

export default class SocietyBlocksController {
  /**
   * Create a new society block
   */

  /**
   * List all blocks for a society
   */
  async index({ params, response }: HttpContext) {
    try {
      const blocks = await SocietyBlock.query()
        .where('society_id', params.societyId)
        .preload('society')

      return response
        .status(200)
        .send(SendResponse.success('Society blocks fetched successfully', blocks))
    } catch (error) {
      return response
        .status(500)
        .send(SendResponse.error('Failed to fetch society blocks', 500, error.message))
    }
  }

  /**
   * Get a single block
   */
  async show({ params, response }: HttpContext) {
    try {
      const block = await SocietyBlock.findOrFail(params.id)
      await block.load('society')

      return response
        .status(200)
        .send(SendResponse.success('Society block fetched successfully', block))
    } catch (error) {
      return response
        .status(500)
        .send(SendResponse.error('Failed to fetch society block', 500, error.message))
    }
  }
}

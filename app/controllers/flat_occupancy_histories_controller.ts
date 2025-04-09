import FlatOccupancyHistory from '#models/flat_occupancy_history'
import { createFlatOccupancyHistoryValidator } from '#validators/flat_occupancy_history_validator'
import SendResponse from '#helpers/send_response_helper'
import type { HttpContext } from '@adonisjs/core/http'

export default class FlatOccupancyHistoriesController {
  async store({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(createFlatOccupancyHistoryValidator)
      const record = await FlatOccupancyHistory.create(payload)
      return response.status(201).send(SendResponse.success('Record added', record))
    } catch (error) {
      return response
        .status(500)
        .send(SendResponse.error('Error adding record', 500, error.message))
    }
  }

  async index({ response }: HttpContext) {
    try {
      const records = await FlatOccupancyHistory.query().preload('user').preload('flat')
      return response.status(200).send(SendResponse.success('Records fetched', records))
    } catch (error) {
      return response
        .status(500)
        .send(SendResponse.error('Error fetching records', 500, error.message))
    }
  }
}

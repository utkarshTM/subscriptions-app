import FlatOccupancyHistory from '#models/flat_occupancy_history'
import SendResponse from '#helpers/send_response_helper'
import type { HttpContext } from '@adonisjs/core/http'
import {
  createFlatOccupancyHistoryValidator,
  updateFlatOccupancyHistoryValidator,
} from '#validators/flat_occupancy_history_validator'
import { DateTime } from 'luxon'

export default class FlatOccupancyHistoriesController {
  async index({ response }: HttpContext) {
    try {
      const histories = await FlatOccupancyHistory.query().preload('flat').preload('user')

      return response.ok(SendResponse.success('Flat occupancy histories fetched', histories))
    } catch (error) {
      return response.internalServerError(
        SendResponse.error('Error fetching histories', 500, error.message)
      )
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const history = await FlatOccupancyHistory.findOrFail(params.id)
      await history.load('flat')
      await history.load('user')

      return response.ok(SendResponse.success('Flat occupancy history found', history))
    } catch (error) {
      return response.internalServerError(
        SendResponse.error('Error fetching history', 500, error.message)
      )
    }
  }

  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(createFlatOccupancyHistoryValidator)

    try {
      const history = await FlatOccupancyHistory.create({
        ...data,
        startDate: DateTime.fromJSDate(data.startDate),
        endDate: data.endDate ? DateTime.fromJSDate(data.endDate) : null,
      })

      return response.created(SendResponse.success('Flat occupancy history created', history))
    } catch (error) {
      return response.internalServerError(
        SendResponse.error('Error creating history', 500, error.message)
      )
    }
  }

  async update({ params, request, response }: HttpContext) {
    const data = await request.validateUsing(updateFlatOccupancyHistoryValidator)

    try {
      const history = await FlatOccupancyHistory.findOrFail(params.id)
      history.merge({
        ...data,
        startDate: data.startDate ? DateTime.fromJSDate(data.startDate) : history.startDate,
        endDate: data.endDate ? DateTime.fromJSDate(data.endDate) : history.endDate,
      })

      await history.save()

      return response.ok(SendResponse.success('Flat occupancy history updated', history))
    } catch (error) {
      return response.internalServerError(
        SendResponse.error('Error updating history', 500, error.message)
      )
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const history = await FlatOccupancyHistory.findOrFail(params.id)
      await history.delete()

      return response.ok(SendResponse.success('Flat occupancy history deleted', history))
    } catch (error) {
      return response.internalServerError(
        SendResponse.error('Error deleting history', 500, error.message)
      )
    }
  }
}

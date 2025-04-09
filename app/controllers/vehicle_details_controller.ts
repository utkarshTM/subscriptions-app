import VehicleDetail from '#models/vehicle_detail'
import {
  createVehicleDetailValidator,
  updateVehicleDetailValidator,
} from '#validators/vehicle_detail_validator'
import SendResponse from '#helpers/send_response_helper'
import type { HttpContext } from '@adonisjs/core/http'

export default class VehicleDetailsController {
  async store({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(createVehicleDetailValidator)
      const vehicle = await VehicleDetail.create(payload)
      return response.status(201).send(SendResponse.success('Vehicle detail created', vehicle))
    } catch (error) {
      return response
        .status(400)
        .send(SendResponse.error('Failed to create vehicle detail', 400, error.message))
    }
  }

  async index({ response }: HttpContext) {
    try {
      const vehicles = await VehicleDetail.query().preload('user').preload('flat')
      return response.status(200).send(SendResponse.success('Vehicle details fetched', vehicles))
    } catch (error) {
      return response
        .status(500)
        .send(SendResponse.error('Failed to fetch vehicle details', 500, error.message))
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const vehicle = await VehicleDetail.query()
        .where('id', params.id)
        .preload('user')
        .preload('flat')
        .firstOrFail()
      return response.status(200).send(SendResponse.success('Vehicle detail found', vehicle))
    } catch (error) {
      return response
        .status(404)
        .send(SendResponse.error('Vehicle detail not found', 404, error.message))
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(updateVehicleDetailValidator)
      const vehicle = await VehicleDetail.findOrFail(params.id)
      vehicle.merge(payload)
      await vehicle.save()
      return response.status(200).send(SendResponse.success('Vehicle detail updated', vehicle))
    } catch (error) {
      return response.status(400).send(SendResponse.error('Update failed', 400, error.message))
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const vehicle = await VehicleDetail.findOrFail(params.id)
      await vehicle.delete()
      return response.status(200).send(SendResponse.success('Vehicle detail deleted'))
    } catch (error) {
      return response.status(500).send(SendResponse.error('Delete failed', 500, error.message))
    }
  }
}

import type { HttpContext } from '@adonisjs/core/http'
import VehicleDetail from '#models/vehicle_detail'
import SendResponse from '#helpers/send_response_helper'
import {
  createVehicleDetailValidator,
  updateVehicleDetailValidator,
} from '#validators/vehicle_detail_validator'

export default class VehicleDetailsController {
  async index({ response }: HttpContext) {
    try {
      const vehicles = await VehicleDetail.query().preload('user').preload('flat')
      return response.ok(SendResponse.success('Vehicle details fetched', vehicles))
    } catch (error) {
      return response.internalServerError(
        SendResponse.error('Error fetching data', 500, error.message)
      )
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const vehicle = await VehicleDetail.findOrFail(params.id)
      await vehicle.load('user')
      await vehicle.load('flat')
      return response.ok(SendResponse.success('Vehicle detail found', vehicle))
    } catch (error) {
      return response.internalServerError(
        SendResponse.error('Error fetching vehicle', 500, error.message)
      )
    }
  }

  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(createVehicleDetailValidator)
    try {
      const vehicle = await VehicleDetail.create(data)
      return response.created(SendResponse.success('Vehicle detail created', vehicle))
    } catch (error) {
      return response.internalServerError(
        SendResponse.error('Error creating vehicle', 500, error.message)
      )
    }
  }

  async update({ params, request, response }: HttpContext) {
    const data = await request.validateUsing(updateVehicleDetailValidator)
    try {
      const vehicle = await VehicleDetail.findOrFail(params.id)
      vehicle.merge(data)
      await vehicle.save()
      return response.ok(SendResponse.success('Vehicle detail updated', vehicle))
    } catch (error) {
      return response.internalServerError(
        SendResponse.error('Error updating vehicle', 500, error.message)
      )
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const vehicle = await VehicleDetail.findOrFail(params.id)
      await vehicle.delete()
      return response.ok(SendResponse.success('Vehicle detail deleted', vehicle))
    } catch (error) {
      return response.internalServerError(
        SendResponse.error('Error deleting vehicle', 500, error.message)
      )
    }
  }
}

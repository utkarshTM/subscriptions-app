import AdminRequest from '#models/admin_request'
import SendResponse from '#helpers/send_response_helper'
import type { HttpContext } from '@adonisjs/core/http'
import {
  createAdminRequestValidator,
  updateAdminRequestValidator,
} from '#validators/admin_request_validator'

export default class AdminRequestsController {
  async index({ response }: HttpContext) {
    try {
      const requests = await AdminRequest.query()
        .preload('user')
        .preload('society')
        .preload('reviewedBy')
      return response.status(200).send(SendResponse.success('Admin requests fetched', requests))
    } catch (error) {
      return response.status(500).send(SendResponse.error('Failed to fetch', 500, error.message))
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const request = await AdminRequest.findOrFail(params.id)
      await request.load('user')
      await request.load('society')
      await request.load('reviewedBy')
      return response.status(200).send(SendResponse.success('Admin request found', request))
    } catch (error) {
      return response.status(500).send(SendResponse.error('Failed to fetch', 500, error.message))
    }
  }

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createAdminRequestValidator)

    try {
      const created = await AdminRequest.create(payload)
      return response.status(201).send(SendResponse.success('Admin request created', created))
    } catch (error) {
      return response.status(500).send(SendResponse.error('Failed to create', 500, error.message))
    }
  }

  async update({ params, request, response }: HttpContext) {
    const payload = await request.validateUsing(updateAdminRequestValidator)

    try {
      const requestToUpdate = await AdminRequest.findOrFail(params.id)
      requestToUpdate.merge(payload)
      await requestToUpdate.save()
      return response
        .status(200)
        .send(SendResponse.success('Admin request updated', requestToUpdate))
    } catch (error) {
      return response.status(500).send(SendResponse.error('Failed to update', 500, error.message))
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const req = await AdminRequest.findOrFail(params.id)
      await req.delete()
      return response.status(200).send(SendResponse.success('Admin request deleted', req))
    } catch (error) {
      return response.status(500).send(SendResponse.error('Failed to delete', 500, error.message))
    }
  }
}

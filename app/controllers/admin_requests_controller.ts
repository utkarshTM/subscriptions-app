import AdminRequest from '#models/admin_request'
import { createAdminRequestValidator } from '#validators/admin_request_validator'
import SendResponse from '#helpers/send_response_helper'
import type { HttpContext } from '@adonisjs/core/http'

export default class AdminRequestsController {
  /**
   * Create admin request
   */
  async store({ request, response, auth }: HttpContext) {
    try {
      const payload = await request.validateUsing(createAdminRequestValidator)
      const user = auth.user!

      const existingRequest = await AdminRequest.query()
        .where('user_id', user.id)
        .where('society_id', payload.societyId)
        .first()

      if (existingRequest) {
        return response.conflict(SendResponse.error('Request already exists', 409))
      }

      const adminRequest = await AdminRequest.create({
        userId: user.id,
        societyId: payload.societyId,
        status: 'pending',
      })

      return response
        .status(201)
        .send(SendResponse.success('Admin request created successfully', adminRequest))
    } catch (error) {
      return response
        .status(500)
        .send(SendResponse.error('Failed to create admin request', 500, error.message))
    }
  }

  /**
   * List all admin requests
   */
  async index({ response, auth }: HttpContext) {
    try {
      const user = auth.user!
      let query = AdminRequest.query().preload('user').preload('society').preload('reviewedBy')

      // Filter based on user role
      if (user.role.name === 'super_admin') {
        // Super admin sees all requests
      } else if (user.role.name === 'admin') {
        // Admin sees only requests for their society
        query = query.where('society_id', user.societyId!)
      } else {
        return response.forbidden(SendResponse.error('Unauthorized to view requests', 403))
      }

      const requests = await query.exec()
      return response
        .status(200)
        .send(SendResponse.success('Admin requests fetched successfully', requests))
    } catch (error) {
      return response
        .status(500)
        .send(SendResponse.error('Failed to fetch admin requests', 500, error.message))
    }
  }
}

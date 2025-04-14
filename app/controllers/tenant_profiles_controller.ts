import TenantProfile from '#models/tenant_profile'
import SendResponse from '#helpers/send_response_helper'
import type { HttpContext } from '@adonisjs/core/http'
import {
  createTenantProfileValidator,
  updateTenantProfileValidator,
} from '#validators/tenant_profile_validator'

export default class TenantProfilesController {
  async index({ response }: HttpContext) {
    try {
      const tenants = await TenantProfile.query()
        .preload('user')
        .preload('owner')
        .preload('flat')
        .preload('block')
        .preload('approvedBy')

      return response.ok(SendResponse.success('Tenant profiles fetched', tenants))
    } catch (error) {
      return response.internalServerError(
        SendResponse.error('Error fetching tenants', 500, error.message)
      )
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const tenant = await TenantProfile.findOrFail(params.id)
      await tenant.load('user')
      await tenant.load('owner')
      await tenant.load('flat')
      await tenant.load('block')
      await tenant.load('approvedBy')

      return response.ok(SendResponse.success('Tenant profile found', tenant))
    } catch (error) {
      return response.internalServerError(
        SendResponse.error('Error fetching tenant', 500, error.message)
      )
    }
  }

  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(createTenantProfileValidator)

    try {
      const tenant = await TenantProfile.create(data)
      return response.created(SendResponse.success('Tenant profile created', tenant))
    } catch (error) {
      return response.internalServerError(
        SendResponse.error('Error creating tenant', 500, error.message)
      )
    }
  }

  async update({ params, request, response }: HttpContext) {
    const data = await request.validateUsing(updateTenantProfileValidator)

    try {
      const tenant = await TenantProfile.findOrFail(params.id)
      tenant.merge(data)
      await tenant.save()

      return response.ok(SendResponse.success('Tenant profile updated', tenant))
    } catch (error) {
      return response.internalServerError(
        SendResponse.error('Error updating tenant', 500, error.message)
      )
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const tenant = await TenantProfile.findOrFail(params.id)
      await tenant.delete()

      return response.ok(SendResponse.success('Tenant profile deleted', tenant))
    } catch (error) {
      return response.internalServerError(
        SendResponse.error('Error deleting tenant', 500, error.message)
      )
    }
  }
}

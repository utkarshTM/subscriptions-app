import Role from '#models/role'
import SendResponse from '#helpers/send_response_helper'
import type { HttpContext } from '@adonisjs/core/http'
import { createRoleValidator, updateRoleValidator } from '#validators/role_validator'

export default class RolesController {
  async index({ response }: HttpContext) {
    try {
      const roles = await Role.query().preload('users')
      return response.ok(SendResponse.success('Roles fetched', roles))
    } catch (error) {
      return response.internalServerError(
        SendResponse.error('Error fetching roles', 500, error.message)
      )
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const role = await Role.findOrFail(params.id)
      await role.load('users')
      return response.ok(SendResponse.success('Role found', role))
    } catch (error) {
      return response.internalServerError(
        SendResponse.error('Error fetching role', 500, error.message)
      )
    }
  }

  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(createRoleValidator)

    try {
      const role = await Role.create(data)
      return response.created(SendResponse.success('Role created', role))
    } catch (error) {
      return response.internalServerError(
        SendResponse.error('Error creating role', 500, error.message)
      )
    }
  }

  async update({ params, request, response }: HttpContext) {
    const data = await request.validateUsing(updateRoleValidator)

    try {
      const role = await Role.findOrFail(params.id)
      role.merge(data)
      await role.save()

      return response.ok(SendResponse.success('Role updated', role))
    } catch (error) {
      return response.internalServerError(
        SendResponse.error('Error updating role', 500, error.message)
      )
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const role = await Role.findOrFail(params.id)
      await role.delete()

      return response.ok(SendResponse.success('Role deleted', role))
    } catch (error) {
      return response.internalServerError(
        SendResponse.error('Error deleting role', 500, error.message)
      )
    }
  }
}

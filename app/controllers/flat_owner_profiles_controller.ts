import FlatOwnerProfile from '#models/flat_owner_profile'
import { DateTime } from 'luxon'
import {
  createFlatOwnerProfileValidator,
  updateFlatOwnerProfileValidator,
  approveFlatOwnerProfileValidator,
} from '#validators/flat_owner_profile_validator'
import SendResponse from '#helpers/send_response_helper'
import type { HttpContext } from '@adonisjs/core/http'

export default class FlatOwnerProfilesController {
  /**
   * Create profile (self-registration or admin-created)
   */
  async store({ request, response, auth }: HttpContext) {
    try {
      const payload = await request.validateUsing(createFlatOwnerProfileValidator)
      const user = auth.user!

      const profile = await FlatOwnerProfile.create({
        ...payload,
        userId: user.id,
        createdById: user.id,
        status: 'pending',
        possessionDate: payload.possessionDate ? DateTime.fromJSDate(payload.possessionDate) : null,
        flatPurchaseDate: payload.flatPurchaseDate
          ? DateTime.fromJSDate(payload.flatPurchaseDate)
          : null,
      })

      return response
        .status(201)
        .send(SendResponse.success('Profile created successfully', profile))
    } catch (error) {
      return response
        .status(500)
        .send(SendResponse.error('Failed to create profile', 500, error.message))
    }
  }

  /**
   * Get current user's profile
   */
  async show({ response, auth }: HttpContext) {
    try {
      const user = auth.user!
      const profile = await FlatOwnerProfile.query()
        .where('user_id', user.id)
        .preload('user')
        .preload('flat')
        .preload('block')
        .firstOrFail()

      return response
        .status(200)
        .send(SendResponse.success('Profile fetched successfully', profile))
    } catch (error) {
      return response
        .status(500)
        .send(SendResponse.error('Failed to fetch profile', 500, error.message))
    }
  }

  /**
   * Update profile (only by owner)
   */
  async update({ request, response, auth }: HttpContext) {
    try {
      const payload = await request.validateUsing(updateFlatOwnerProfileValidator)
      const user = auth.user!
      const profile = await FlatOwnerProfile.query().where('user_id', user.id).firstOrFail()

      profile.merge({
        ...payload,
        possessionDate: payload.possessionDate
          ? DateTime.fromJSDate(new Date(payload.possessionDate))
          : null,
        flatPurchaseDate: payload.flatPurchaseDate
          ? DateTime.fromJSDate(new Date(payload.flatPurchaseDate))
          : null,
      })
      await profile.save()

      return response
        .status(200)
        .send(SendResponse.success('Profile updated successfully', profile))
    } catch (error) {
      return response
        .status(500)
        .send(SendResponse.error('Failed to update profile', 500, error.message))
    }
  }

  /**
   * List all pending profiles (admin only)
   */
  async pending({ response, auth }: HttpContext) {
    try {
      const user = auth.user!
      if (user.role.name !== 'admin') {
        return response.forbidden(SendResponse.error('Unauthorized', 403))
      }

      const profiles = await FlatOwnerProfile.query()
        .where('status', 'pending')
        .preload('user')
        .preload('flat')
        .preload('block')

      return response.status(200).send(SendResponse.success('Pending profiles fetched', profiles))
    } catch (error) {
      return response
        .status(500)
        .send(SendResponse.error('Failed to fetch pending profiles', 500, error.message))
    }
  }

  /**
   * Approve/Reject profile (admin only)
   */
  async approve({ params, request, response, auth }: HttpContext) {
    try {
      const payload = await request.validateUsing(approveFlatOwnerProfileValidator)
      const user = auth.user!
      if (user.role.name !== 'admin') {
        return response.forbidden(SendResponse.error('Unauthorized', 403))
      }

      const profile = await FlatOwnerProfile.findOrFail(params.id)
      profile.merge({
        ...payload,
        approvedById: user.id,
      })
      await profile.save()

      return response
        .status(200)
        .send(SendResponse.success(`Profile ${payload.status} successfully`, profile))
    } catch (error) {
      return response
        .status(500)
        .send(SendResponse.error('Failed to update profile status', 500, error.message))
    }
  }
}

import FlatOwnerProfile from '#models/flat_owner_profile'
import SendResponse from '#helpers/send_response_helper'
import type { HttpContext } from '@adonisjs/core/http'
import {
  createFlatOwnerProfileValidator,
  updateFlatOwnerProfileValidator,
  approveFlatOwnerProfileValidator,
} from '#validators/flat_owner_profile_validator'
import { DateTime } from 'luxon'

export default class FlatOwnerProfilesController {
  async index({ response }: HttpContext) {
    try {
      const profiles = await FlatOwnerProfile.query()
        .preload('user')
        .preload('flat')
        .preload('block')
        .preload('createdBy')
        .preload('approvedBy')

      return response.ok(SendResponse.success('Flat owner profiles fetched', profiles))
    } catch (error) {
      return response.internalServerError(
        SendResponse.error('Error fetching profiles', 500, error.message)
      )
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const profile = await FlatOwnerProfile.findOrFail(params.id)
      await profile.load('user')
      await profile.load('flat')
      await profile.load('block')
      await profile.load('createdBy')
      await profile.load('approvedBy')

      return response.ok(SendResponse.success('Flat owner profile found', profile))
    } catch (error) {
      return response.internalServerError(
        SendResponse.error('Error fetching profile', 500, error.message)
      )
    }
  }

  async store({ auth, request, response }: HttpContext) {
    const data = await request.validateUsing(createFlatOwnerProfileValidator)

    try {
      const profile = await FlatOwnerProfile.create({
        ...data,
        possessionDate: data.possessionDate ? DateTime.fromJSDate(data.possessionDate) : null,
        flatPurchaseDate: data.flatPurchaseDate ? DateTime.fromJSDate(data.flatPurchaseDate) : null,
        userId: auth.user!.id,
        createdById: auth.user!.id,
        status: 'pending',
      })

      return response.created(SendResponse.success('Flat owner profile created', profile))
    } catch (error) {
      return response.internalServerError(
        SendResponse.error('Error creating profile', 500, error.message)
      )
    }
  }

  async update({ params, request, response }: HttpContext) {
    const data = await request.validateUsing(updateFlatOwnerProfileValidator)

    try {
      const profile = await FlatOwnerProfile.findOrFail(params.id)
      profile.merge({
        ...data,
        possessionDate: data.possessionDate ? DateTime.fromJSDate(data.possessionDate) : null,
        flatPurchaseDate: data.flatPurchaseDate ? DateTime.fromJSDate(data.flatPurchaseDate) : null,
      })

      await profile.save()

      return response.ok(SendResponse.success('Flat owner profile updated', profile))
    } catch (error) {
      return response.internalServerError(
        SendResponse.error('Error updating profile', 500, error.message)
      )
    }
  }

  async approve({ params, request, auth, response }: HttpContext) {
    const data = await request.validateUsing(approveFlatOwnerProfileValidator)

    try {
      const profile = await FlatOwnerProfile.findOrFail(params.id)
      profile.merge({
        ...data,
        approvedById: auth.user!.id,
      })
      await profile.save()

      return response.ok(SendResponse.success('Flat owner profile status updated', profile))
    } catch (error) {
      return response.internalServerError(
        SendResponse.error('Error approving profile', 500, error.message)
      )
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const profile = await FlatOwnerProfile.findOrFail(params.id)
      await profile.delete()

      return response.ok(SendResponse.success('Flat owner profile deleted', profile))
    } catch (error) {
      return response.internalServerError(
        SendResponse.error('Error deleting profile', 500, error.message)
      )
    }
  }
}

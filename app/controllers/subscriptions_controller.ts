import Subscription from '#models/subscription'
import SendResponse from '#helpers/send_response_helper'
import type { HttpContext } from '@adonisjs/core/http'
import {
  createSubscriptionValidator,
  updateSubscriptionValidator,
} from '#validators/subscription_validator'

export default class SubscriptionsController {
  async index({ response }: HttpContext) {
    try {
      const subscriptions = await Subscription.query().preload('user').preload('plan')

      return response.ok(SendResponse.success('Subscriptions fetched', subscriptions))
    } catch (error) {
      return response.internalServerError(
        SendResponse.error('Error fetching subscriptions', 500, error.message)
      )
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const subscription = await Subscription.findOrFail(params.id)
      await subscription.load('user')
      await subscription.load('plan')

      return response.ok(SendResponse.success('Subscription found', subscription))
    } catch (error) {
      return response.internalServerError(
        SendResponse.error('Error fetching subscription', 500, error.message)
      )
    }
  }

  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(createSubscriptionValidator)

    try {
      const subscription = await Subscription.create(data)

      return response.created(SendResponse.success('Subscription created', subscription))
    } catch (error) {
      return response.internalServerError(
        SendResponse.error('Error creating subscription', 500, error.message)
      )
    }
  }

  async update({ params, request, response }: HttpContext) {
    const data = await request.validateUsing(updateSubscriptionValidator)

    try {
      const subscription = await Subscription.findOrFail(params.id)
      subscription.merge(data)
      await subscription.save()

      return response.ok(SendResponse.success('Subscription updated', subscription))
    } catch (error) {
      return response.internalServerError(
        SendResponse.error('Error updating subscription', 500, error.message)
      )
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const subscription = await Subscription.findOrFail(params.id)
      await subscription.delete()

      return response.ok(SendResponse.success('Subscription deleted', subscription))
    } catch (error) {
      return response.internalServerError(
        SendResponse.error('Error deleting subscription', 500, error.message)
      )
    }
  }
}

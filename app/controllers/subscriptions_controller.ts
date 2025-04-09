import Subscription from '#models/subscription'
import {
  createSubscriptionValidator,
  updateSubscriptionValidator,
} from '#validators/subscription_validator'
import SendResponse from '#helpers/send_response_helper'
import type { HttpContext } from '@adonisjs/core/http'

export default class SubscriptionsController {
  async store({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(createSubscriptionValidator)
      const subscription = await Subscription.create(payload)
      return response.status(201).send(SendResponse.success('Subscription created', subscription))
    } catch (error) {
      return response
        .status(500)
        .send(SendResponse.error('Failed to create subscription', 500, error.message))
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(updateSubscriptionValidator)
      const subscription = await Subscription.findOrFail(params.id)
      subscription.merge(payload)
      await subscription.save()
      return response.status(200).send(SendResponse.success('Subscription updated', subscription))
    } catch (error) {
      return response
        .status(500)
        .send(SendResponse.error('Failed to update subscription', 500, error.message))
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const subscription = await Subscription.query()
        .where('id', params.id)
        .preload('user')
        .preload('plan')
        .firstOrFail()
      return response.status(200).send(SendResponse.success('Subscription fetched', subscription))
    } catch (error) {
      return response
        .status(500)
        .send(SendResponse.error('Failed to fetch subscription', 500, error.message))
    }
  }

  async index({ response }: HttpContext) {
    try {
      const subscriptions = await Subscription.query().preload('user').preload('plan')
      return response
        .status(200)
        .send(SendResponse.success('All subscriptions fetched', subscriptions))
    } catch (error) {
      return response
        .status(500)
        .send(SendResponse.error('Failed to fetch subscriptions', 500, error.message))
    }
  }
}

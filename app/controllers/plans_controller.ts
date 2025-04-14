import type { HttpContext } from '@adonisjs/core/http'
import Plan from '#models/plan'
import SendResponse from '#helpers/send_response_helper'
import { createPlanValidator, updatePlanValidator } from '#validators/plan_validator'

export default class PlansController {
  async index({ response }: HttpContext) {
    try {
      const plans = await Plan.all()
      return response.ok(SendResponse.success('Plans fetched successfully', plans))
    } catch (error) {
      return response.internalServerError(
        SendResponse.error('Failed to fetch plans', 500, error.message)
      )
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const plan = await Plan.findOrFail(params.id)
      return response.ok(SendResponse.success('Plan fetched successfully', plan))
    } catch (error) {
      return response.internalServerError(
        SendResponse.error('Failed to fetch plan', 500, error.message)
      )
    }
  }

  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(createPlanValidator)

    try {
      const plan = await Plan.create(data)
      return response.created(SendResponse.success('Plan created successfully', plan))
    } catch (error) {
      return response.internalServerError(
        SendResponse.error('Failed to create plan', 500, error.message)
      )
    }
  }

  async update({ params, request, response }: HttpContext) {
    const data = await request.validateUsing(updatePlanValidator)

    try {
      const plan = await Plan.findOrFail(params.id)
      plan.merge(data)
      await plan.save()
      return response.ok(SendResponse.success('Plan updated successfully', plan))
    } catch (error) {
      return response.internalServerError(
        SendResponse.error('Failed to update plan', 500, error.message)
      )
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const plan = await Plan.findOrFail(params.id)
      await plan.delete()
      return response.ok(SendResponse.success('Plan deleted successfully', plan))
    } catch (error) {
      return response.internalServerError(
        SendResponse.error('Failed to delete plan', 500, error.message)
      )
    }
  }
}

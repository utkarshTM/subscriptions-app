import Notification from '#models/notification'
import SendResponse from '#helpers/send_response_helper'
import type { HttpContext } from '@adonisjs/core/http'
import {
  createNotificationValidator,
  updateNotificationValidator,
} from '#validators/notification_validator'

export default class NotificationsController {
  async index({ response }: HttpContext) {
    try {
      const notifications = await Notification.query().preload('user')
      return response.ok(SendResponse.success('Notifications fetched', notifications))
    } catch (error) {
      return response.internalServerError(
        SendResponse.error('Error fetching notifications', 500, error.message)
      )
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const notification = await Notification.findOrFail(params.id)
      await notification.load('user')

      return response.ok(SendResponse.success('Notification found', notification))
    } catch (error) {
      return response.internalServerError(
        SendResponse.error('Error fetching notification', 500, error.message)
      )
    }
  }

  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(createNotificationValidator)

    try {
      const notification = await Notification.create(data)
      return response.created(SendResponse.success('Notification created', notification))
    } catch (error) {
      return response.internalServerError(
        SendResponse.error('Error creating notification', 500, error.message)
      )
    }
  }

  async update({ params, request, response }: HttpContext) {
    const data = await request.validateUsing(updateNotificationValidator)

    try {
      const notification = await Notification.findOrFail(params.id)

      notification.merge(data)
      await notification.save()

      return response.ok(SendResponse.success('Notification updated', notification))
    } catch (error) {
      return response.internalServerError(
        SendResponse.error('Error updating notification', 500, error.message)
      )
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const notification = await Notification.findOrFail(params.id)
      await notification.delete()

      return response.ok(SendResponse.success('Notification deleted', notification))
    } catch (error) {
      return response.internalServerError(
        SendResponse.error('Error deleting notification', 500, error.message)
      )
    }
  }
}

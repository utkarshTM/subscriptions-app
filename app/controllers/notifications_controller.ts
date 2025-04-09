import Notification from '#models/notification'
import { createNotificationValidator } from '#validators/notification_validator'
import SendResponse from '#helpers/send_response_helper'
import type { HttpContext } from '@adonisjs/core/http'

export default class NotificationsController {
  async index({ response, auth }: HttpContext) {
    try {
      const user = auth.user!
      const notifications = await Notification.query()
        .where('user_id', user.id)
        .orderBy('created_at', 'desc')

      return response.status(200).send(SendResponse.success('Notifications fetched', notifications))
    } catch (error) {
      return response
        .status(500)
        .send(SendResponse.error('Failed to fetch notifications', 500, error.message))
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(createNotificationValidator)
      const notification = await Notification.create(payload)

      return response.status(201).send(SendResponse.success('Notification created', notification))
    } catch (error) {
      return response
        .status(500)
        .send(SendResponse.error('Failed to create notification', 500, error.message))
    }
  }

  async markRead({ params, response, auth }: HttpContext) {
    try {
      const user = auth.user!
      const notification = await Notification.query()
        .where('id', params.id)
        .where('user_id', user.id)
        .firstOrFail()

      notification.isRead = true
      await notification.save()

      return response
        .status(200)
        .send(SendResponse.success('Notification marked as read', notification))
    } catch (error) {
      return response
        .status(500)
        .send(SendResponse.error('Failed to update notification', 500, error.message))
    }
  }
}

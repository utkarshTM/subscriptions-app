import Notification from '#models/notification';
import { HttpContext } from '@adonisjs/core/http';

export default class NotificationsController {

 /**
   * Get Notification 
*/
  // async getNotifications({ auth, response }: HttpContext) {
  //   const userId = auth.user?.id;

  //   if (!userId) {
  //     return response.badRequest({ error: 'User not found' });
  //   }

  //   try {
  //     const notifications = await Notification.query()
  //       .where('user_id', userId)
  //       .orderBy('created_at', 'desc');

  //     return response.ok({ notifications });
  //   } catch (error) {
  //     console.error('Error fetching notifications:', error);
  //     return response.internalServerError({ error: 'Failed to fetch notifications' });
  //   }
  // }
  async getNotifications({ auth, response }: HttpContext) {
    const userId = auth.user?.id;
  
    if (!userId) {
      return response.badRequest({ error: 'User not found' });
    }
  
    try {
      const notifications = await Notification.query()
        .where('user_id', userId)
        .orderBy('created_at', 'desc');
  
      const unreadCount = await Notification.query()
        .where('user_id', userId)
        .andWhere('is_read', false)
        .count('* as total');
  
      return response.ok({ 
        notifications, 
        unreadCount: unreadCount[0].$extras.total 
      });
    } catch (error) {
      console.error('Error fetching notifications:', error);
      return response.internalServerError({ error: 'Failed to fetch notifications' });
    }
  }



  /**
   * Mark notification as read
*/
  async markAsRead({ auth, request, response }: HttpContext) {
    const userId = auth.user?.id;
    const notificationId = request.input('notificationId');
  
    if (!userId || !notificationId) {
      return response.badRequest({ error: 'Invalid user or notification data' });
    }
  
    try {
      const notification = await Notification.query()
        .where('id', notificationId)
        .andWhere('user_id', userId)
        .first();
  
      if (!notification) {
        return response.notFound({ error: 'Notification not found' });
      }
  
      notification.isRead = true;
      await notification.save();
  
      return response.ok({ message: 'Notification marked as read' });
    } catch (error) {
      console.error('Error marking notification as read:', error);
      return response.internalServerError({ error: 'Failed to mark notification as read' });
    }
  }
  
  
}

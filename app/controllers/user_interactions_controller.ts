import Interaction from '#models/interaction';
import Notification from '#models/notification';
import User from '#models/user';
import type { HttpContext } from '@adonisjs/core/http';

export default class UserInteractionsController {


  /**
   * Handle a "like" interaction.
   */

  async likeUser({ auth, request, response }: HttpContext) {
    const userId = auth.user?.id;
    const targetUserId = request.input('targetUserId');
  
    if (!userId || !targetUserId) {
      return response.badRequest({ error: 'Invalid user or target user data' });
    }
  
    try {
      // Fetch the user's first name
      const user = await User.find(userId);
      if (!user) {
        return response.badRequest({ error: 'User not found' });
      }
  
      // Create the interaction
      await Interaction.create({
        userId,
        targetUserId,
        type: 'like',
      });
  
      // Create a notification for the target user
      await Notification.create({
        user_id: targetUserId,
        message: `${user.firstName} gave you a Like!`,
      });
  
      return response.ok({ message: 'Like recorded successfully' });
    } catch (error) {
      console.error('Error recording like:', error);
      return response.internalServerError({ error: 'Failed to record like' });
    }
  }
  


/**
   * Handle a "super-like" interaction.
   */
async superLikeUser({ auth, request, response }: HttpContext) {
  const userId = auth.user?.id;
  const targetUserId = request.input('targetUserId');

  if (!userId || !targetUserId) {
    return response.badRequest({ error: 'Invalid user or target user data' });
  }

  try {
    // Fetch the user's first name
    const user = await User.find(userId);
    if (!user) {
      return response.badRequest({ error: 'User not found' });
    }

    // Create the interaction
    await Interaction.create({
      userId,
      targetUserId,
      type: 'superlike',
    });

    // Create a notification for the target user
    await Notification.create({
      user_id: targetUserId,
      message: `${user.firstName} gave you a Super Like!`,
    });

    return response.ok({ message: 'Super-like recorded successfully' });
  } catch (error) {
    console.error('Error recording super-like:', error);
    return response.internalServerError({ error: 'Failed to record super-like' });
  }
}


}

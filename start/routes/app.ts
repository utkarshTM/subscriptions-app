const NotificationsController = () => import('#controllers/app/notifications_controller');
import router from '@adonisjs/core/services/router';
import { middleware } from '#start/kernel';

function appRoutes() {
    
// User notification routes
router.group(() => {
    router.get('/notifications', [NotificationsController, 'getNotifications'])
    router.post('/notifications/mark-as-read', [NotificationsController, 'markAsRead'])
})
  .prefix('/v1') 
  .use([middleware.auth()]);

}
export default appRoutes;

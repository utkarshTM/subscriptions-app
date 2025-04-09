import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
const NotificationsController = () => import('#controllers/app/notifications_controller')

export default function appRoutes() {
  router
    .group(() => {
      router.get('/notifications', [NotificationsController, 'getNotifications'])
      router.post('/notifications/mark-as-read', [NotificationsController, 'markAsRead'])
    })
    .prefix('/v1')
    .use([middleware.auth()])
}

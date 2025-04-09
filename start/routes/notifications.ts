import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import NotificationsController from '#controllers/notifications_controller'

export default function notificationsRoutes() {
  router
    .group(() => {
      router.get('/', [NotificationsController, 'index'])
      router.post('/', [NotificationsController, 'store'])
      router.put('/:id/mark-read', [NotificationsController, 'markRead'])
    })
    .prefix('/notifications')
    .use([middleware.auth()])
}

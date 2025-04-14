import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import NotificationsController from '#controllers/notifications_controller'

export default function notificationsRoutes() {
  router
    .group(() => {
      router.get('/', [NotificationsController, 'index'])
      router.get('/:id', [NotificationsController, 'show'])
      router.post('/', [NotificationsController, 'store'])
      router.put('/:id', [NotificationsController, 'update'])
      router.delete('/:id', [NotificationsController, 'destroy'])
    })
    .prefix('/notifications')
    .use([middleware.auth()])
}

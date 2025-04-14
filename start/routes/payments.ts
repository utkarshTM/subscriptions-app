import router from '@adonisjs/core/services/router'
import PaymentsController from '#controllers/payments_controller'
import { middleware } from '#start/kernel'

export default function subscriptionsRoutes() {
  router
    .group(() => {
      router.get('/', [PaymentsController, 'index'])
      router.get('/:id', [PaymentsController, 'show'])
      router.post('/', [PaymentsController, 'store'])
      router.put('/:id', [PaymentsController, 'update'])
      router.delete('/:id', [PaymentsController, 'destroy'])
    })
    .prefix('/payments')
    .use([middleware.auth()])
}

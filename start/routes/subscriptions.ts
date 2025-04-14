import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import SubscriptionsController from '#controllers/subscriptions_controller'
import PlansController from '#controllers/plans_controller'

export default function subscriptionsRoutes() {
  router
    .group(() => {
      router.get('/', [PlansController, 'index'])
      router.get('/:id', [PlansController, 'show'])
      router.post('/', [PlansController, 'store'])
      router.put('/:id', [PlansController, 'update'])
      router.delete('/:id', [PlansController, 'destroy'])
    })
    .prefix('/plans')
    .use([middleware.auth()])

  router
    .group(() => {
      router.get('/', [SubscriptionsController, 'index'])
      router.get('/:id', [SubscriptionsController, 'show'])
      router.post('/', [SubscriptionsController, 'store'])
      router.put('/:id', [SubscriptionsController, 'update'])
      router.delete('/:id', [SubscriptionsController, 'destroy'])
    })
    .prefix('/subscriptions')
    .use([middleware.auth()])
}

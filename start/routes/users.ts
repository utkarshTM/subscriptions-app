import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import AdminRequestsController from '#controllers/admin_requests_controller'
import FlatOwnerProfilesController from '#controllers/flat_owner_profiles_controller'
import TenantProfilesController from '#controllers/tenant_profiles_controller'

export default function userRoutes() {
  router
    .group(() => {
      router.post('/', [AdminRequestsController, 'store'])
      router.get('/', [AdminRequestsController, 'index'])
    })
    .prefix('/admin-requests')
    .use([middleware.auth()])

  router
    .group(() => {
      router.post('/', [FlatOwnerProfilesController, 'store'])
      router.get('/', [FlatOwnerProfilesController, 'show'])
      router.put('/', [FlatOwnerProfilesController, 'update'])
      router.get('/pending', [FlatOwnerProfilesController, 'pending'])
      router.post('/:id/approve', [FlatOwnerProfilesController, 'approve'])
    })
    .prefix('/flat-owner-profiles')
    .use([middleware.auth()])

  router
    .group(() => {
      router.post('/', [TenantProfilesController, 'store'])
      router.get('/', [TenantProfilesController, 'show'])
      router.put('/', [TenantProfilesController, 'update'])
      router.get('/pending', [TenantProfilesController, 'pending'])
      router.post('/:id/approve', [TenantProfilesController, 'approve'])
    })
    .prefix('/tenant-profiles')
    .use([middleware.auth()])
}

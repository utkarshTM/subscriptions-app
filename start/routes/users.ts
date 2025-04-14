import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import UsersController from '#controllers/users_controller'
import AdminRequestsController from '#controllers/admin_requests_controller'
import FlatOwnerProfilesController from '#controllers/flat_owner_profiles_controller'
import FlatOccupancyHistoriesController from '#controllers/flat_occupancy_histories_controller'
import TenantProfilesController from '#controllers/tenant_profiles_controller'

export default function userRoutes() {
  router
    .group(() => {
      router.get('/', [UsersController, 'index'])
      router.get('/:id', [UsersController, 'show'])
      router.post('/', [UsersController, 'store'])
      router.put('/:id', [UsersController, 'update'])
      router.delete('/:id', [UsersController, 'destroy'])
    })
    .prefix('/users')
    .use([middleware.auth()])

  router
    .group(() => {
      router.get('/', [AdminRequestsController, 'index'])
      router.get('/:id', [AdminRequestsController, 'show'])
      router.post('/', [AdminRequestsController, 'store'])
      router.put('/:id', [AdminRequestsController, 'update'])
      router.delete('/:id', [AdminRequestsController, 'destroy'])
    })
    .prefix('/admin-requests')
    .use([middleware.auth()])

  router
    .group(() => {
      router.get('/', [FlatOwnerProfilesController, 'index'])
      router.get('/:id', [FlatOwnerProfilesController, 'show'])
      router.post('/', [FlatOwnerProfilesController, 'store'])
      router.put('/:id', [FlatOwnerProfilesController, 'update'])
      router.patch('/:id/approve', [FlatOwnerProfilesController, 'approve'])
      router.delete('/:id', [FlatOwnerProfilesController, 'destroy'])
    })
    .prefix('/flat-owner-profiles')
    .use([middleware.auth()])

  router
    .group(() => {
      router.get('/', [FlatOccupancyHistoriesController, 'index'])
      router.get('/:id', [FlatOccupancyHistoriesController, 'show'])
      router.post('/', [FlatOccupancyHistoriesController, 'store'])
      router.put('/:id', [FlatOccupancyHistoriesController, 'update'])
      router.delete('/:id', [FlatOccupancyHistoriesController, 'destroy'])
    })
    .prefix('/flat-occupancy-histories')
    .use([middleware.auth()])

  router
    .group(() => {
      router.get('/', [TenantProfilesController, 'index'])
      router.get('/:id', [TenantProfilesController, 'show'])
      router.post('/', [TenantProfilesController, 'store'])
      router.put('/:id', [TenantProfilesController, 'update'])
      router.delete('/:id', [TenantProfilesController, 'destroy'])
    })
    .prefix('/tenant-profiles')
    .use([middleware.auth()])
}

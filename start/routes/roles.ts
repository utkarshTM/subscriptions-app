import router from '@adonisjs/core/services/router'
import RolesController from '#controllers/roles_controller'

export default function appRoutes() {
  router
    .group(() => {
      router.get('/', [RolesController, 'index'])
      router.get('/:id', [RolesController, 'show'])
      router.post('/', [RolesController, 'store'])
      router.put('/:id', [RolesController, 'update'])
      router.delete('/:id', [RolesController, 'destroy'])
    })
    .prefix('/roles')
    .as('roles')
}

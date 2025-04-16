import router from '@adonisjs/core/services/router'
import PasswordController from '#controllers/password_controller'

export default function passwordRoutes() {
  router
    .group(() => {
      router.post('/forgot-password', [PasswordController, 'forgotPassword'])
      router.post('/reset-password', [PasswordController, 'resetPassword'])
    })
    .prefix('/v1/auth')
}

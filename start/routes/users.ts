const UsersController = () => import('#controllers/users_controller');
import router from '@adonisjs/core/services/router';
import { middleware } from '#start/kernel';

function user() {
  // Routes without middleware
  router
    .group(() => {
      router.post('/login', [UsersController, 'loginUser']);
      router.post('/password/reset-request', [UsersController, 'requestPasswordReset']);
      router.post('/password/reset', [UsersController, 'resetPassword']);
      router.post('/register-user', [UsersController, 'registerUser']);
      router.get('/all', [UsersController, 'fetchAllUsers']);
    })
    .prefix('/users');

  // Routes with middleware
  router
    .group(() => {
      router.post('/upload-photos', [UsersController, 'uploadUserPhotos']);
      router.get('/photos', [UsersController, 'fetchAllPhotos']);
      router.get('/profile', [UsersController, 'fetchUserProfile']);
      router.put('/profile', [UsersController, 'editUserProfile']);
    })
    .prefix('/users')
    .use([middleware.auth()]);

  return router;
}

export default user;

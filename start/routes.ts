/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import appRoutes from './routes/app.js'
import userInteraction from './routes/user_interactions.js'
import user from './routes/users.js'
import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})


router.group(() => {
  user()
})
.prefix('/api')


router.group(() => {
  userInteraction();
})
.prefix('/api');


router.group(() => {
  appRoutes();
})
.prefix('/api');





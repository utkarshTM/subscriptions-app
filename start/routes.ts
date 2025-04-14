// /*
// |--------------------------------------------------------------------------
// | Routes file
// |--------------------------------------------------------------------------
// |
// | The routes file is used for defining the HTTP routes.
// |
// */

// import appRoutes from './routes/app.js'
// import notifications from './routes/notifications.js'
// import societies from './routes/societies.js'
// import userInteraction from './routes/user_interactions.js'
// import user from './routes/users.js'
// import router from '@adonisjs/core/services/router'

// router.get('/', async () => {
//   return {
//     hello: 'world',
//   }
// })

// router
//   .group(() => {
//     user()
//   })
//   .prefix('/api')

// router
//   .group(() => {
//     userInteraction()
//   })
//   .prefix('/api')

// router
//   .group(() => {
//     societies()
//   })
//   .prefix('/api')

// router
//   .group(() => {
//     appRoutes()
//   })
//   .prefix('/api')

// router
//   .group(() => {
//     notifications()
//   })
//   .prefix('/api')
import router from '@adonisjs/core/services/router'
import appRoutes from './routes/roles.js'
import notificationsRoutes from './routes/notifications.js'
import societiesRoutes from './routes/societies.js'
import userInteractionsRoutes from './routes/user_interactions.js'
import userRoutes from './routes/users.js'

router.get('/', async () => {
  return { hello: 'world' }
})

router
  .group(() => {
    userRoutes()
    societiesRoutes()
    appRoutes()
    notificationsRoutes()
  })
  .prefix('/api')

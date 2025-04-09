import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import SocietiesController from '#controllers/societies_controller'
import SocietyBlocksController from '#controllers/society_blocks_controller'
import SocietyFlatsController from '#controllers/society_flats_controller'
import SocietyAmenitiesController from '#controllers/society_amenities_controller'
import SocietyImagesController from '#controllers/society_images_controller'
import SocietyBoardMembersController from '#controllers/society_board_members_controller'
import FlatOccupancyHistoriesController from '#controllers/flat_occupancy_histories_controller'
import VehicleDetailsController from '#controllers/vehicle_details_controller'
import SubscriptionsController from '#controllers/subscriptions_controller'
import PaymentsController from '#controllers/payments_controller'

export default function societiesRoutes() {
  router
    .group(() => {
      router.get('/', [SocietiesController, 'index'])
      router.get('/:id', [SocietiesController, 'show'])

      router
        .group(() => {
          router.get('/', [SocietyAmenitiesController, 'index'])
          router.get('/:id', [SocietyAmenitiesController, 'show'])
          router
            .group(() => {
              router.post('/', [SocietyAmenitiesController, 'store'])
              router.put('/:id', [SocietyAmenitiesController, 'update'])
              router.delete('/:id', [SocietyAmenitiesController, 'destroy'])
            })
            .use([middleware.auth()])
        })
        .prefix('/:societyId/amenities')

      router
        .group(() => {
          router.get('/', [SocietyBlocksController, 'index'])
          router.get('/:id', [SocietyBlocksController, 'show'])

          router
            .group(() => {
              router.get('/', [SocietyFlatsController, 'index'])
              router.get('/:id', [SocietyFlatsController, 'show'])
              router
                .group(() => {
                  router.post('/', [SocietyFlatsController, 'store'])
                  router.put('/:id', [SocietyFlatsController, 'update'])
                  router.delete('/:id', [SocietyFlatsController, 'destroy'])
                })
                .use([middleware.auth()])
            })
            .prefix('/:blockId/flats')

          router
            .group(() => {
              router.post('/', [FlatOccupancyHistoriesController, 'store'])
              router.get('/', [FlatOccupancyHistoriesController, 'index'])
            })
            .prefix('/flat-occupancy-histories')
            .use([middleware.auth()])

          router
            .group(() => {
              router.post('/', [SocietyBlocksController, 'store'])
              router.put('/:id', [SocietyBlocksController, 'update'])
              router.delete('/:id', [SocietyBlocksController, 'destroy'])
            })
            .use([middleware.auth()])

          router
            .group(() => {
              router.get('/', [VehicleDetailsController, 'index'])
              router.get('/:id', [VehicleDetailsController, 'show'])
              router.post('/', [VehicleDetailsController, 'store'])
              router.put('/:id', [VehicleDetailsController, 'update'])
              router.delete('/:id', [VehicleDetailsController, 'destroy'])
            })
            .prefix('/vehicle-details')
        })
        .prefix('/:societyId/blocks')

      router
        .group(() => {
          router.get('/', [SocietyImagesController, 'index'])
          router.post('/', [SocietyImagesController, 'store'])
          router.put('/:id', [SocietyImagesController, 'update'])
          router.delete('/:id', [SocietyImagesController, 'destroy'])
        })
        .prefix('/:societyId/images')
        .use([middleware.auth()])

      router
        .group(() => {
          router.get('/', [SocietyBoardMembersController, 'index'])
          router.post('/', [SocietyBoardMembersController, 'store'])
          router.put('/:id', [SocietyBoardMembersController, 'update'])
          router.delete('/:id', [SocietyBoardMembersController, 'destroy'])
        })
        .prefix('/:societyId/board-members')
        .use([middleware.auth()])
    })
    .prefix('/societies')

  router
    .group(() => {
      router.post('/', [SocietiesController, 'store'])
      router.put('/:id', [SocietiesController, 'update'])
      router.delete('/:id', [SocietiesController, 'destroy'])
      router.post('/:id/toggle-verification', [SocietiesController, 'toggleVerification'])
    })
    .prefix('/societies')
    .use([middleware.auth()])

  router
    .group(() => {
      router.post('/', [SubscriptionsController, 'store'])
      router.get('/', [SubscriptionsController, 'index'])
      router.get('/:id', [SubscriptionsController, 'show'])
      router.put('/:id', [SubscriptionsController, 'update'])
    })
    .prefix('/subscriptions')
    .use([middleware.auth()])

  router
    .group(() => {
      router.post('/', [PaymentsController, 'store'])
      router.get('/', [PaymentsController, 'index'])
      router.post('/:id/verify', [PaymentsController, 'verify'])
    })
    .prefix('/payments')
    .use([middleware.auth()])
}

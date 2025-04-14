import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import VehicleDetailsController from '#controllers/vehicle_details_controller'
import SocietiesController from '#controllers/societies_controller'
import SocietyAmenitiesController from '#controllers/society_amenities_controller'
import SocietyBlocksController from '#controllers/society_blocks_controller'
import SocietyFlatsController from '#controllers/society_flats_controller'
import SocietyBoardMembersController from '#controllers/society_board_members_controller'
import SocietyImagesController from '#controllers/society_images_controller'

export default function societiesRoutes() {
  router
    .group(() => {
      router.get('/', [SocietiesController, 'index'])
      router.get('/:id', [SocietiesController, 'show'])
      router.post('/', [SocietiesController, 'store'])
      router.put('/:id', [SocietiesController, 'update'])
      router.delete('/:id', [SocietiesController, 'destroy'])
    })
    .prefix('/societies')

  router
    .group(() => {
      SocietyBlocksController
      router.get('/', [SocietyBlocksController, 'index'])
      router.get('/', [SocietyBlocksController, 'show'])
      router.post('/', [SocietyBlocksController, 'store'])
      router.put('/', [SocietyBlocksController, 'update'])
      router.delete('/', [SocietyBlocksController, 'destroy'])
    })
    .prefix('/society-blocks')

  router
    .group(() => {
      router.get('/', [SocietyFlatsController, 'index'])
      router.get('/', [SocietyFlatsController, 'show'])
      router.post('/', [SocietyFlatsController, 'store'])
      router.put('/', [SocietyFlatsController, 'update'])
      router.delete('/', [SocietyFlatsController, 'destroy'])
    })
    .prefix('/society-flats')

  router
    .group(() => {
      router.get('/', [SocietyBoardMembersController, 'show'])
      router.post('/', [SocietyBoardMembersController, 'store'])
      router.put('/', [SocietyBoardMembersController, 'update'])
      router.delete('/', [SocietyBoardMembersController, 'destroy'])
    })
    .prefix('/society-board-members')

  router
    .group(() => {
      router.get('/', [SocietyAmenitiesController, 'index'])
      router.get('/', [SocietyAmenitiesController, 'show'])
      router.post('/', [SocietyAmenitiesController, 'store'])
      router.put('/', [SocietyAmenitiesController, 'update'])
      router.delete('/', [SocietyAmenitiesController, 'destroy'])
    })
    .prefix('/society-amenities')

  router
    .group(() => {
      router.get('/', [SocietyImagesController, 'index'])
      router.post('/', [SocietyImagesController, 'store'])
      router.get('/:id', [SocietyImagesController, 'show'])
      router.put('/:id', [SocietyImagesController, 'update'])
      router.delete('/:id', [SocietyImagesController, 'destroy'])
    })
    .prefix('/society-images')

  router
    .group(() => {
      router.get('/', [VehicleDetailsController, 'index'])
      router.get('/:id', [VehicleDetailsController, 'show'])
      router.post('/', [VehicleDetailsController, 'store'])
      router.put('/:id', [VehicleDetailsController, 'update'])
      router.delete('/:id', [VehicleDetailsController, 'destroy'])
    })
    .prefix('vehicle-details/')
    .use([middleware.auth()])
}

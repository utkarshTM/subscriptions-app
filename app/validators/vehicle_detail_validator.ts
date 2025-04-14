import vine from '@vinejs/vine'

export const createVehicleDetailValidator = vine.compile(
  vine.object({
    userId: vine.number().exists(async (db, value) => {
      const user = await db.from('users').where('id', value).first()
      return !!user
    }),
    flatId: vine.number().exists(async (db, value) => {
      const flat = await db.from('society_flats').where('id', value).first()
      return !!flat
    }),
    vehicleNumber: vine.string().trim().minLength(4).maxLength(20),
    vehicleType: vine.enum(['2-wheeler', '4-wheeler', 'electric', 'other']),
    isActive: vine.boolean().optional(),
  })
)

export const updateVehicleDetailValidator = vine.compile(
  vine.object({
    vehicleNumber: vine.string().trim().minLength(4).maxLength(20).optional(),
    vehicleType: vine.enum(['2-wheeler', '4-wheeler', 'electric', 'other']).optional(),
    isActive: vine.boolean().optional(),
  })
)

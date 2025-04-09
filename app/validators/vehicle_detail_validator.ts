import vine from '@vinejs/vine'

export const createVehicleDetailValidator = vine.compile(
  vine.object({
    userId: vine.number(),
    flatId: vine.number(),
    vehicleNumber: vine.string().trim(),
    vehicleType: vine.enum(['2-wheeler', '4-wheeler', 'electric', 'other']),
    isActive: vine.boolean().optional(),
  })
)
export const updateVehicleDetailValidator = vine.compile(
  vine.object({
    vehicleNumber: vine.string().trim().optional(),
    vehicleType: vine.enum(['2-wheeler', '4-wheeler', 'electric', 'other']).optional(),
    isActive: vine.boolean().optional(),
  })
)

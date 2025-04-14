import vine from '@vinejs/vine'

export const createFlatOccupancyHistoryValidator = vine.compile(
  vine.object({
    flatId: vine.number().exists(async (db, value) => {
      const flat = await db.from('society_flats').where('id', value).first()
      return !!flat
    }),
    userId: vine.number().exists(async (db, value) => {
      const user = await db.from('users').where('id', value).first()
      return !!user
    }),
    startDate: vine.date(),
    endDate: vine.date().optional(),
    userType: vine.enum(['owner', 'tenant']),
    remarks: vine.string().trim().optional(),
  })
)

export const updateFlatOccupancyHistoryValidator = vine.compile(
  vine.object({
    startDate: vine.date().optional(),
    endDate: vine.date().optional(),
    userType: vine.enum(['owner', 'tenant']).optional(),
    remarks: vine.string().trim().optional(),
  })
)

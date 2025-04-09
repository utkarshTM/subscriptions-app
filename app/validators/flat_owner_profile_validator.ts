import vine from '@vinejs/vine'

export const createFlatOwnerProfileValidator = vine.compile(
  vine.object({
    possessionDate: vine.date().optional(),
    flatPurchaseDate: vine.date().optional(),
    occupation: vine.string().trim().minLength(3).maxLength(255),
    userType: vine.enum(['owner', 'tenant']),
    flatId: vine.number().exists(async (db, value) => {
      const flat = await db.from('society_flats').where('id', value).first()
      return !!flat
    }),
    blockId: vine.number().exists(async (db, value) => {
      const block = await db.from('society_blocks').where('id', value).first()
      return !!block
    }),
    living: vine.boolean().optional(),
    parkingAllotted: vine.number().min(0),
  })
)

export const updateFlatOwnerProfileValidator = vine.compile(
  vine.object({
    possessionDate: vine.date().optional(),
    flatPurchaseDate: vine.date().optional(),
    occupation: vine.string().trim().minLength(3).maxLength(255).optional(),
    userType: vine.enum(['owner', 'tenant']).optional(),
    living: vine.boolean().optional(),
    parkingAllotted: vine.number().min(0).optional(),
  })
)

export const approveFlatOwnerProfileValidator = vine.compile(
  vine.object({
    status: vine.enum(['approved', 'rejected']),
    remarks: vine.string().trim().optional(),
  })
)

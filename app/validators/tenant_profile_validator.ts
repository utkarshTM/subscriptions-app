import vine from '@vinejs/vine'

export const createTenantProfileValidator = vine.compile(
  vine.object({
    userId: vine.number().exists(async (db, value) => {
      const user = await db.from('users').where('id', value).first()
      return !!user
    }),
    ownerId: vine.number().exists(async (db, value) => {
      const user = await db.from('users').where('id', value).first()
      return !!user
    }),
    occupation: vine.string(),
    flatId: vine.number().exists(async (db, value) => {
      const flat = await db.from('society_flats').where('id', value).first()
      return !!flat
    }),
    blockId: vine.number().exists(async (db, value) => {
      const block = await db.from('society_blocks').where('id', value).first()
      return !!block
    }),
    living: vine.boolean(),
    status: vine.enum(['pending', 'approved', 'rejected']),
    approvedById: vine.number().optional(),
    remarks: vine.string().optional(),
  })
)

export const updateTenantProfileValidator = vine.compile(
  vine.object({
    occupation: vine.string().optional(),
    living: vine.boolean().optional(),
    status: vine.enum(['pending', 'approved', 'rejected']).optional(),
    approvedById: vine.number().optional(),
    remarks: vine.string().optional(),
  })
)

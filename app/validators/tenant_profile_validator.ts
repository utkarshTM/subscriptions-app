import vine from '@vinejs/vine'

export const createTenantProfileValidator = vine.compile(
  vine.object({
    ownerId: vine.number().exists(async (db, value) => {
      const owner = await db.from('users').where('id', value).first()
      return !!owner
    }),
    occupation: vine.string().trim().minLength(3).maxLength(255),
    flatId: vine.number().exists(async (db, value) => {
      const flat = await db.from('society_flats').where('id', value).first()
      return !!flat
    }),
    blockId: vine.number().exists(async (db, value) => {
      const block = await db.from('society_blocks').where('id', value).first()
      return !!block
    }),
    living: vine.boolean().optional(),
  })
)

export const updateTenantProfileValidator = vine.compile(
  vine.object({
    occupation: vine.string().trim().minLength(3).maxLength(255).optional(),
    living: vine.boolean().optional(),
  })
)

export const approveTenantProfileValidator = vine.compile(
  vine.object({
    status: vine.enum(['approved', 'rejected']),
    remarks: vine.string().trim().optional(),
  })
)

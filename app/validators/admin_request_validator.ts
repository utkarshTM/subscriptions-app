import vine from '@vinejs/vine'

export const createAdminRequestValidator = vine.compile(
  vine.object({
    userId: vine.number().exists(async (db, value) => {
      const user = await db.from('users').where('id', value).first()
      return !!user
    }),
    societyId: vine.number().exists(async (db, value) => {
      const society = await db.from('societies').where('id', value).first()
      return !!society
    }),
    status: vine.enum(['pending', 'approved', 'rejected']).optional(),
    reviewedBy: vine.number().optional(),
    remarks: vine.string().optional(),
  })
)

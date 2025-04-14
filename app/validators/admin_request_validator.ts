import vine from '@vinejs/vine'

export const createAdminRequestValidator = vine.compile(
  vine.object({
    userId: vine.number().exists(async (db, value) => {
      return !!(await db.from('users').where('id', value).first())
    }),
    societyId: vine.number().exists(async (db, value) => {
      return !!(await db.from('societies').where('id', value).first())
    }),
    status: vine.enum(['pending', 'approved', 'rejected']).optional(),
    reviewedById: vine
      .number()
      .exists(async (db, value) => {
        return !!(await db.from('users').where('id', value).first())
      })
      .optional(),
    remarks: vine.string().optional(),
  })
)

export const updateAdminRequestValidator = vine.compile(
  vine.object({
    status: vine.enum(['pending', 'approved', 'rejected']).optional(),
    reviewedById: vine
      .number()
      .exists(async (db, value) => {
        return !!(await db.from('users').where('id', value).first())
      })
      .optional(),
    remarks: vine.string().optional(),
  })
)

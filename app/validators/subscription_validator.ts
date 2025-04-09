import vine from '@vinejs/vine'

export const createSubscriptionValidator = vine.compile(
  vine.object({
    userId: vine.number().exists(async (db, value) => {
      return !!(await db.from('users').where('id', value).first())
    }),
    planId: vine.number().exists(async (db, value) => {
      return !!(await db.from('plans').where('id', value).first())
    }),
    status: vine.enum(['pending', 'approved', 'expired', 'future']).optional(),
    active: vine.boolean().optional(),
  })
)

export const updateSubscriptionValidator = vine.compile(
  vine.object({
    status: vine.enum(['pending', 'approved', 'expired', 'future']).optional(),
    active: vine.boolean().optional(),
    planId: vine.number().optional(),
  })
)

import vine from '@vinejs/vine'

export const createSubscriptionValidator = vine.compile(
  vine.object({
    userId: vine.number().exists(async (db, value) => {
      const user = await db.from('users').where('id', value).first()
      return !!user
    }),
    planId: vine.number().exists(async (db, value) => {
      const plan = await db.from('plans').where('id', value).first()
      return !!plan
    }),
    active: vine.boolean().optional(),
    status: vine.enum(['pending', 'approved', 'expired', 'future']).optional(),
  })
)

export const updateSubscriptionValidator = vine.compile(
  vine.object({
    planId: vine.number().optional(),
    active: vine.boolean().optional(),
    status: vine.enum(['pending', 'approved', 'expired', 'future']).optional(),
  })
)

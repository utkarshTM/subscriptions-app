import vine from '@vinejs/vine'

export const createPlanValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
    interval: vine.enum(['monthly', 'quarterly', 'half-yearly', 'annually']),
    amount: vine.number(),
    active: vine.boolean(),
    description: vine.string(),
    planOrder: vine.number().optional(),
    isPopular: vine.boolean().optional(),
    planType: vine.enum(['recurring', 'one_time']),
  })
)

export const updatePlanValidator = vine.compile(
  vine.object({
    name: vine.string().trim().optional(),
    interval: vine.enum(['monthly', 'quarterly', 'half-yearly', 'annually']).optional(),
    amount: vine.number().optional(),
    active: vine.boolean().optional(),
    description: vine.string().optional(),
    planOrder: vine.number().optional(),
    isPopular: vine.boolean().optional(),
    planType: vine.enum(['recurring', 'one_time']).optional(),
  })
)

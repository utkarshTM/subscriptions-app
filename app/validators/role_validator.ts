import vine from '@vinejs/vine'

export const createRoleValidator = vine.compile(
  vine.object({
    name: vine.enum(['owner', 'tenant', 'admin', 'super_admin']),
    description: vine.string().trim().minLength(3),
  })
)

export const updateRoleValidator = vine.compile(
  vine.object({
    name: vine.enum(['owner', 'tenant', 'admin', 'super_admin']).optional(),
    description: vine.string().trim().minLength(3).optional(),
  })
)

import vine from '@vinejs/vine'

export const createSocietyValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3).maxLength(255),
    address: vine.string().trim().minLength(10),
    registrationNumber: vine.string().trim().minLength(3),
    userId: vine.number().exists(async (db, value) => {
      const user = await db.from('users').where('id', value).first()
      return !!user
    }),
    isVerified: vine.boolean().optional(),
    isActive: vine.boolean().optional(),
  })
)

export const updateSocietyValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3).maxLength(255).optional(),
    address: vine.string().trim().minLength(10).optional(),
    registrationNumber: vine.string().trim().minLength(3).optional(),
    userId: vine.number().optional(),
    isVerified: vine.boolean().optional(),
    isActive: vine.boolean().optional(),
  })
)

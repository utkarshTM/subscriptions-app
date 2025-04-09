import vine from '@vinejs/vine'

export const createSocietyValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3).maxLength(255),
    address: vine.string().trim().minLength(10),
    registrationNumber: vine.string().trim().minLength(5).maxLength(50),
  })
)

export const updateSocietyValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3).maxLength(255).optional(),
    address: vine.string().trim().minLength(10).optional(),
    registrationNumber: vine.string().trim().minLength(5).maxLength(50).optional(),
    isVerified: vine.boolean().optional(),
    isActive: vine.boolean().optional(),
  })
)

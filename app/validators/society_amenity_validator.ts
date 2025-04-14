import vine from '@vinejs/vine'

export const createSocietyAmenityValidator = vine.compile(
  vine.object({
    societyId: vine.number().exists(async (db, value) => {
      const society = await db.from('societies').where('id', value).first()
      return !!society
    }),
    name: vine.string().trim().minLength(2).maxLength(255),
    description: vine.string().trim().minLength(5),
    count: vine.number().min(1),
  })
)

export const updateSocietyAmenityValidator = vine.compile(
  vine.object({
    societyId: vine.number().optional(),
    name: vine.string().trim().minLength(2).maxLength(255).optional(),
    description: vine.string().trim().minLength(5).optional(),
    count: vine.number().min(1).optional(),
  })
)

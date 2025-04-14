import vine from '@vinejs/vine'

export const createSocietyBlockValidator = vine.compile(
  vine.object({
    societyId: vine.number().exists(async (db, value) => {
      const society = await db.from('societies').where('id', value).first()
      return !!society
    }),
    name: vine.string().trim().minLength(2).maxLength(255),
    description: vine.string().trim().minLength(5),
  })
)

export const updateSocietyBlockValidator = vine.compile(
  vine.object({
    societyId: vine.number().optional(),
    name: vine.string().trim().minLength(2).maxLength(255).optional(),
    description: vine.string().trim().minLength(5).optional(),
  })
)

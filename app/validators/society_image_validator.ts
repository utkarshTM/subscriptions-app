import vine from '@vinejs/vine'

export const createSocietyImageValidator = vine.compile(
  vine.object({
    societyId: vine.number().exists(async (db, value) => {
      const society = await db.from('societies').where('id', value).first()
      return !!society
    }),
    imageUrl: vine.string().trim(),
    caption: vine.string().trim(),
    uploadedById: vine.number().exists(async (db, value) => {
      const user = await db.from('users').where('id', value).first()
      return !!user
    }),
  })
)

export const updateSocietyImageValidator = vine.compile(
  vine.object({
    imageUrl: vine.string().trim().optional(),
    caption: vine.string().trim().optional(),
  })
)

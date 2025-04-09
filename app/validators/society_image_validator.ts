import vine from '@vinejs/vine'

export const createSocietyImageValidator = vine.compile(
  vine.object({
    societyId: vine.number().exists(async (db, value) => {
      const society = await db.from('societies').where('id', value).first()
      return !!society
    }),
    imageUrl: vine.string().trim(),
    caption: vine.string().trim().optional(),
  })
)

export const updateSocietyImageValidator = vine.compile(
  vine.object({
    caption: vine.string().trim().optional(),
  })
)

import vine from '@vinejs/vine'

export const createSocietyFlatValidator = vine.compile(
  vine.object({
    societyId: vine.number().exists(async (db, value) => {
      const society = await db.from('societies').where('id', value).first()
      return !!society
    }),
    blockId: vine.number().exists(async (db, value) => {
      const block = await db.from('society_blocks').where('id', value).first()
      return !!block
    }),
    flatNumber: vine.string().trim().minLength(1).maxLength(50),
    flatType: vine.enum(['1BHK', '2BHK', '3BHK', 'Penthouse']),
    isOccupied: vine.boolean().optional(),
  })
)

export const updateSocietyFlatValidator = vine.compile(
  vine.object({
    societyId: vine.number().optional(),
    blockId: vine.number().optional(),
    flatNumber: vine.string().trim().minLength(1).maxLength(50).optional(),
    flatType: vine.enum(['1BHK', '2BHK', '3BHK', 'Penthouse']).optional(),
    isOccupied: vine.boolean().optional(),
  })
)

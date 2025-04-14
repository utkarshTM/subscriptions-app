import vine from '@vinejs/vine'

export const createSocietyBoardMemberValidator = vine.compile(
  vine.object({
    societyId: vine.number().exists(async (db, value) => {
      const society = await db.from('societies').where('id', value).first()
      return !!society
    }),
    userId: vine.number().exists(async (db, value) => {
      const user = await db.from('users').where('id', value).first()
      return !!user
    }),
    designation: vine.string().trim().minLength(2).maxLength(100),
    tenureStart: vine.date(),
    tenureEnd: vine.date().nullable().optional(),
  })
)

export const updateSocietyBoardMemberValidator = vine.compile(
  vine.object({
    societyId: vine.number().optional(),
    userId: vine.number().optional(),
    designation: vine.string().trim().minLength(2).maxLength(100).optional(),
    tenureStart: vine.date().optional(),
    tenureEnd: vine.date().nullable().optional(),
  })
)

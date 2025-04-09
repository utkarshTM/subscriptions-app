import vine from '@vinejs/vine'
import { DateTime } from 'luxon'

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
    designation: vine.string().trim().minLength(3).maxLength(100),
    tenureStart: vine.date().afterOrEqual(DateTime.now().toISODate()),
    tenureEnd: vine.date().optional(),
  })
)

export const updateSocietyBoardMemberValidator = vine.compile(
  vine.object({
    designation: vine.string().trim().minLength(3).maxLength(100).optional(),
    tenureStart: vine.date().optional(),
    tenureEnd: vine.date().optional(),
  })
)

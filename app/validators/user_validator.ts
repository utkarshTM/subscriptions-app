import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3).maxLength(255),
    email: vine.string().trim().email(),
    phone: vine.string().trim().minLength(10).maxLength(15),
    password: vine.string().minLength(6),
    roleId: vine.number().exists(async (db, value) => {
      const role = await db.from('roles').where('id', value).first()
      return !!role
    }),
    societyId: vine.number().exists(async (db, value) => {
      const society = await db.from('societies').where('id', value).first()
      return !!society
    }),
  })
)

export const updateUserValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3).maxLength(255).optional(),
    email: vine.string().trim().email().optional(),
    phone: vine.string().trim().minLength(10).maxLength(15).optional(),
    password: vine.string().minLength(6).optional(),
    roleId: vine.number().optional(),
    societyId: vine.number().optional(),
  })
)

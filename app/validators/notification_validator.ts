import vine from '@vinejs/vine'

export const createNotificationValidator = vine.compile(
  vine.object({
    userId: vine.number().exists(async (db, value) => {
      const user = await db.from('users').where('id', value).first()
      return !!user
    }),
    message: vine.string().trim().minLength(5),
    type: vine.enum([
      'promotional',
      'subscription',
      'general',
      'admin_announcement',
      'security_alert',
    ]),
  })
)

import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import { type DateTime } from 'luxon'
import { type BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'

export default class PasswordResetToken extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'user_id' })
  declare userId: number

  @column()
  declare email: string

  @column()
  declare token: string

  @column.dateTime()
  declare expiresAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime | null

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  /** Relations **/

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}

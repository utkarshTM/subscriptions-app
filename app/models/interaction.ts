import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import User from './user.js'
import { type BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Interaction extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare targetUserId: number

  @column()
  declare type: 'like' | 'superlike'

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime | null;

  @belongsTo(() => User, { localKey: 'userId' })
  declare user: BelongsTo<typeof User>

  @belongsTo(() => User, { localKey: 'targetUserId' })
  declare targetUser: BelongsTo<typeof User>
}
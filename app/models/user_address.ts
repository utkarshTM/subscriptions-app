import { DateTime } from 'luxon'
import User from './user.js'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import { type BelongsTo } from '@adonisjs/lucid/types/relations'

export default class UserAddress extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare address?: string

  @column()
  declare city?: string

  @column()
  declare state?: string

  @column()
  declare postalCode?: string

  @column()
  declare country?: string

  @column()
  declare userId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  /** Relations **/

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}

import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import { type BelongsTo } from '@adonisjs/lucid/types/relations';
import User from './user.js';

export default class DatingUserValue extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare user_id: number

  @column()
  declare photos: string[] | null 

  @column()
  declare education: string | null

  @column()
  declare zodiac_sign: string | null

  @column()
  declare languages: string[] | null

  @column()
  declare current_city: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoUpdate: true })
  declare updatedAt: DateTime


  /** Relationships **/

  @belongsTo(() => User, { foreignKey: 'user_id' })
  declare user: BelongsTo<typeof User>;
}
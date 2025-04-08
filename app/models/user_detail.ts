import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import User from './user.js'
import { type BelongsTo } from '@adonisjs/lucid/types/relations'

export default class UserDetails extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare gender?: string

  @column()
  declare dateOfBirth?: Date

  @column()
  declare religion?: string

  @column()
  declare motherTongue?: string

  @column()
  declare education?: string

  @column()
  declare occupation?: string

  @column()
  declare height?: number

  @column()
  declare annualIncome?: number

  @column()
  declare stateLiving?: string

  @column()
  declare maritalStatus?: string

  @column()
  declare dietPreference?: string

  @column()
  declare community?: string

  @column()
  declare zodiacSign?: string

  @column()
  declare profileCreatedBy?: string

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

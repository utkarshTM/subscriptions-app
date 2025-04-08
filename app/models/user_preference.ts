import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import User from './user.js'
import { type BelongsTo } from '@adonisjs/lucid/types/relations'

export default class UserPreferences extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare dietPreference?: string

  @column()
  declare interests?: string

  @column()
  declare doYouSmoke?: string

  @column()
  declare doYouDrink?: string

  @column()
  declare doYouWorkout?: string

  @column()
  declare havePets?: string

  @column()
  declare interestedIn?: string

  @column()
  declare lookingFor?: string

  @column()
  declare sexualOrientation?: string

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

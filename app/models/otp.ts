import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import { type BelongsTo } from '@adonisjs/lucid/types/relations'
import User from '#models/user' 

export default class Otp extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare phone: string

  @column()
  declare otp: string

  @column.dateTime()
  declare expiresAt: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime


  @belongsTo(() => User, {foreignKey: 'phone',  localKey: 'phone'})
  declare user: BelongsTo<typeof User>
}


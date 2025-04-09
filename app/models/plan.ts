import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class Plan extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare interval: 'monthly' | 'quarterly' | 'half-yearly' | 'annually'

  @column()
  declare amount: number

  @column()
  declare active: boolean

  @column()
  declare description: string

  @column()
  declare planOrder: number

  @column()
  declare isPopular: boolean

  @column()
  declare planType: 'recurring' | 'one_time'

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}

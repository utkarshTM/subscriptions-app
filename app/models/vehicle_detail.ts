import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import SocietyFlat from './society_flat.js'

export default class VehicleDetail extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare flatId: number

  @column()
  declare vehicleNumber: string

  @column()
  declare vehicleType: '2-wheeler' | '4-wheeler' | 'electric' | 'other'

  @column()
  declare isActive: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => SocietyFlat)
  declare flat: BelongsTo<typeof SocietyFlat>
}

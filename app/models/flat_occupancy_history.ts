import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import SocietyFlat from './society_flat.js'
import User from './user.js'

export default class FlatOccupancyHistory extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare flatId: number

  @column()
  declare userId: number

  @column.date()
  declare startDate: DateTime

  @column.date()
  declare endDate: DateTime | null

  @column()
  declare userType: 'owner' | 'tenant'

  @column()
  declare remarks: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => SocietyFlat)
  declare flat: BelongsTo<typeof SocietyFlat>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}

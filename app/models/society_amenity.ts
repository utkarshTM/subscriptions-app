import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Society from './society.js'

export default class SocietyAmenity extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare societyId: number

  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare count: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  /** Relations **/
  @belongsTo(() => Society)
  declare society: BelongsTo<typeof Society>
}

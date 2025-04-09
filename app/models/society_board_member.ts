import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Society from './society.js'
import User from './user.js'

export default class SocietyBoardMember extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare societyId: number

  @column()
  declare userId: number

  @column()
  declare designation: string

  @column.date()
  declare tenureStart: DateTime

  @column.date()
  declare tenureEnd: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  /** Relations **/
  @belongsTo(() => Society)
  declare society: BelongsTo<typeof Society>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}

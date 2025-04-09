import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Society from './society.js'

export default class AdminRequest extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare societyId: number

  @column()
  declare status: 'pending' | 'approved' | 'rejected'

  @column()
  declare reviewedById: number | null

  @column()
  declare remarks: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  /** Relations **/
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Society)
  declare society: BelongsTo<typeof Society>

  @belongsTo(() => User, { foreignKey: 'reviewedById' })
  declare reviewedBy: BelongsTo<typeof User>
}

import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Society from './society.js'
import User from './user.js'

export default class SocietyImage extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare societyId: number

  @column()
  declare imageUrl: string

  @column()
  declare caption: string

  @column()
  declare uploadedById: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  /** Relations **/
  @belongsTo(() => Society)
  declare society: BelongsTo<typeof Society>

  @belongsTo(() => User, { foreignKey: 'uploadedById' })
  declare uploadedBy: BelongsTo<typeof User>
}

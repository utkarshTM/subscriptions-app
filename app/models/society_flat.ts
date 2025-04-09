import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Society from './society.js'
import SocietyBlock from './society_block.js'

export default class SocietyFlat extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare societyId: number

  @column()
  declare blockId: number

  @column()
  declare flatNumber: string

  @column()
  declare flatType: '1BHK' | '2BHK' | '3BHK' | 'Penthouse'

  @column()
  declare isOccupied: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  /** Relations **/
  @belongsTo(() => Society)
  declare society: BelongsTo<typeof Society>

  @belongsTo(() => SocietyBlock)
  declare block: BelongsTo<typeof SocietyBlock>
}

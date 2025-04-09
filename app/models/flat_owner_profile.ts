import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import SocietyFlat from './society_flat.js'
import SocietyBlock from './society_block.js'

export default class FlatOwnerProfile extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column.date()
  declare possessionDate: DateTime | null

  @column.date()
  declare flatPurchaseDate: DateTime | null

  @column()
  declare occupation: string

  @column()
  declare userType: 'owner' | 'tenant'

  @column()
  declare flatId: number

  @column()
  declare blockId: number

  @column()
  declare living: boolean

  @column()
  declare parkingAllotted: number

  @column()
  declare createdById: number | null

  @column()
  declare status: 'pending' | 'approved' | 'rejected'

  @column()
  declare approvedById: number | null

  @column()
  declare remarks: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  /** Relations **/
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => SocietyFlat)
  declare flat: BelongsTo<typeof SocietyFlat>

  @belongsTo(() => SocietyBlock)
  declare block: BelongsTo<typeof SocietyBlock>

  @belongsTo(() => User, { foreignKey: 'createdById' })
  declare createdBy: BelongsTo<typeof User>

  @belongsTo(() => User, { foreignKey: 'approvedById' })
  declare approvedBy: BelongsTo<typeof User>
}

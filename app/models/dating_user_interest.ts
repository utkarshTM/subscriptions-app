import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import { type BelongsTo } from '@adonisjs/lucid/types/relations'
import User from '#models/user'

export default class DatingUserInterest extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare user_id: number

  @column()
  declare self_care: string | string[] | null;


  @column()
  declare sports: string | string[] | null;

  @column()
  declare creativity: string | string[] | null;

  @column()
  declare going_out: string | string[] | null;

  @column()
  declare staying_in: string | string[] | null;

  @column()
  declare film_and_tv: string | string[] | null;

  @column()
  declare reading: string | string[] | null;

  @column()
  declare music: string | string[] | null;

  @column()
  declare food_and_drink: string | string[] | null;

  @column()
  declare travelling: string | string[] | null;

  @column()
  declare pets: string | string[] | null;

  @column()
  declare personality_and_traits: string | string[] | null;

  @column()
  declare drinking: string | string[] | null;

  @column()
  declare smoking: string | string[] | null;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoUpdate: true })
  declare updatedAt: DateTime

  /** Relationships **/
  @belongsTo(() => User, { foreignKey: 'user_id' })
  declare user: BelongsTo<typeof User>
}

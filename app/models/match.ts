import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import { type BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'


export default class Match extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare user_1_id: number

  @column()
  declare user_2_id: number

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime 

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updated_at: DateTime


  /** Relations **/

  @belongsTo(() => User, {
    foreignKey: 'user_1_id',
  })
  declare user_1: BelongsTo<typeof User>;
  
  @belongsTo(() => User, {
    foreignKey: 'user_2_id',
  })
  declare user_2: BelongsTo<typeof User>;

}
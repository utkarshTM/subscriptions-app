import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import { type BelongsTo } from '@adonisjs/lucid/types/relations';
import User from './user.js';


export default class DatingUserPreference extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare user_id: number

  @column()
  declare relationship_type: string[] | null

  @column()
  declare values_in_person: string[] | null

  @column()
  declare lifestyle_habits:string[] | null

  @column()
  declare religion: string | null

  @column()
  declare politics: string | null

  @column()
  declare causes: string[] | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoUpdate: true })
  declare updatedAt: DateTime

  
    /** Relationships **/
  @belongsTo(() => User, { foreignKey: 'user_id' })
  declare user: BelongsTo<typeof User>;


}
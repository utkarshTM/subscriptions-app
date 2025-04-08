import { DateTime } from 'luxon';
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm';
import User from './user.js';
import { type BelongsTo } from '@adonisjs/lucid/types/relations';


export default class DatingUserDetail extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare user_id: number;

  @column()
  declare email: string;

  @column()
  declare gender: string;

  @column()
  declare pronouns: string;

  @column()
  declare sexual_orientation: string;

  @column()
  declare height: string;

  @column()
  declare height_unit: string;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;

    /** Relationships **/

  @belongsTo(() => User, { foreignKey: 'user_id' })
  declare user: BelongsTo<typeof User>;
}

import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasOne, hasMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import { Timestamp } from '#helpers/model_timestamp_helper'
import UserPreferences from './user_preference.js'
import UserPhoto from './user_photo.js'
import UserDetails from './user_detail.js'
import UserAddress from './user_address.js'
import { type HasOne } from '@adonisjs/lucid/types/relations'
import { type HasMany } from '@adonisjs/lucid/types/relations'
import PasswordResetToken from './password_reset_token.js'
import Interaction from './interaction.js'

const AuthFinder = withAuthFinder(() => hash.use('bcrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, Timestamp, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare firstName: string

  @column()
  declare lastName: string

  @column()
  declare phone?: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  /** Relations **/

  @hasOne(() => UserPreferences)
  declare userPreferences: HasOne<typeof UserPreferences>


  @hasMany(() => UserPhoto)
  declare userPhoto: HasMany<typeof UserPhoto>


  @hasOne(() => UserDetails)
  declare userDetails: HasOne<typeof UserDetails>


  @hasMany(() => UserAddress)
  declare userAddress: HasMany<typeof UserAddress>

  
  @hasMany(() => PasswordResetToken)
  declare passwordResetTokens: HasMany<typeof PasswordResetToken>;


  @hasMany(() => Interaction, { foreignKey: 'userId' })
  declare interactions: HasMany<typeof Interaction>


  static accessTokens = DbAccessTokensProvider.forModel(User)
}

import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { Timestamp } from '#helpers/model_timestamp_helper'
import type { HasMany, BelongsTo } from '@adonisjs/lucid/types/relations'
import Role from './role.js'
import Society from './society.js'
import AdminRequest from './admin_request.js'
import AccessToken from './access_token.js'

const AuthFinder = withAuthFinder(() => hash.use('bcrypt'), {
  uids: ['email'],
  passwordColumnName: 'passwordHash',
})

export default class User extends compose(BaseModel, Timestamp, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare passwordHash: string

  @column()
  declare phone: string

  @column()
  declare roleId: number

  @column()
  declare societyId: number | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  /** Relations **/
  @belongsTo(() => Role)
  declare role: BelongsTo<typeof Role>

  @belongsTo(() => Society)
  declare society: BelongsTo<typeof Society>

  @hasMany(() => AdminRequest)
  declare adminRequests: HasMany<typeof AdminRequest>

  @hasMany(() => AccessToken)
  declare accessTokens: HasMany<typeof AccessToken>
}

// import { DateTime } from 'luxon'
// import hash from '@adonisjs/core/services/hash'
// import { compose } from '@adonisjs/core/helpers'
// import { BaseModel, column, hasOne, hasMany } from '@adonisjs/lucid/orm'
// import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
// import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
// import { Timestamp } from '#helpers/model_timestamp_helper'
// import UserPreferences from './user_preference.js'
// import UserPhoto from './user_photo.js'
// import UserDetails from './user_detail.js'
// import UserAddress from './user_address.js'
// import { type HasOne } from '@adonisjs/lucid/types/relations'
// import { type HasMany } from '@adonisjs/lucid/types/relations'
// import PasswordResetToken from './password_reset_token.js'
// import Interaction from './interaction.js'

// const AuthFinder = withAuthFinder(() => hash.use('bcrypt'), {
//   uids: ['email'],
//   passwordColumnName: 'password',
// })

// export default class User extends compose(BaseModel, Timestamp, AuthFinder) {
//   @column({ isPrimary: true })
//   declare id: number

//   @column()
//   declare email: string

//   @column({ serializeAs: null })
//   declare password: string

//   @column()
//   declare firstName: string

//   @column()
//   declare lastName: string

//   @column()
//   declare phone?: string

//   @column()
//   declare isAdmin: boolean

//   @column.dateTime({ autoCreate: true })
//   declare createdAt: DateTime

//   @column.dateTime({ autoCreate: true, autoUpdate: true })
//   declare updatedAt: DateTime

//   /** Relations **/

//   @hasOne(() => UserPreferences)
//   declare userPreferences: HasOne<typeof UserPreferences>

//   @hasMany(() => UserPhoto)
//   declare userPhoto: HasMany<typeof UserPhoto>

//   @hasOne(() => UserDetails)
//   declare userDetails: HasOne<typeof UserDetails>

//   @hasMany(() => UserAddress)
//   declare userAddress: HasMany<typeof UserAddress>

//   @hasMany(() => PasswordResetToken)
//   declare passwordResetTokens: HasMany<typeof PasswordResetToken>

//   @hasMany(() => Interaction, { foreignKey: 'userId' })
//   declare interactions: HasMany<typeof Interaction>

//   static accessTokens = DbAccessTokensProvider.forModel(User)
// }

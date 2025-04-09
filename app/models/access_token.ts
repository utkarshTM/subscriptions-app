// import { BaseModel, column } from '@adonisjs/lucid/orm'
// import { compose } from '@adonisjs/core/helpers'
// import { Timestamp } from '#helpers/model_timestamp_helper'
// import { type DateTime } from 'luxon'

// export default class AccessToken extends compose(BaseModel, Timestamp) {
//   @column({ isPrimary: true })
//   declare id: number

//   @column({ columnName: 'user_id' })
//   declare userId: number

//   @column.dateTime({ columnName: 'expires_at' })
//   declare expiresAt: DateTime | null
// }

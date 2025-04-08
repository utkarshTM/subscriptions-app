import { NormalizeConstructor } from '@adonisjs/core/types/helpers'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { type DateTime } from 'luxon'

export function Timestamp<Model extends NormalizeConstructor<typeof BaseModel>>(superclass: Model) {
  class TimestampHelper extends superclass {
    // luxon DateTime for createdAt and updatedAt
    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime
  }

  return TimestampHelper
}

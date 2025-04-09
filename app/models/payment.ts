import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Plan from './plan.js'

export default class Payment extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare planId: number

  @column()
  declare proofType: 'transaction_id' | 'receipt_no' | 'screenshot' | 'other'

  @column()
  declare proofValue: string

  @column()
  declare discountApplied: number

  @column.date()
  declare paymentDate: DateTime

  @column()
  declare financialYear: string

  @column()
  declare verifiedByAdmin: boolean

  @column()
  declare isAdvancePayment: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Plan)
  declare plan: BelongsTo<typeof Plan>
}

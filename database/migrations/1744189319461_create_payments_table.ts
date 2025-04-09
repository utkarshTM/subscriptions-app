import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Payments extends BaseSchema {
  protected tableName = 'payments'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('plan_id').unsigned().references('id').inTable('plans').onDelete('CASCADE')
      table
        .enum('proof_type', ['transaction_id', 'receipt_no', 'screenshot', 'other'])
        .notNullable()
      table.text('proof_value').notNullable()
      table.decimal('discount_applied', 10, 2).defaultTo(0)
      table.date('payment_date').notNullable()
      table.string('financial_year').notNullable()
      table.boolean('verified_by_admin').defaultTo(false)
      table.boolean('is_advance_payment').defaultTo(false)
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

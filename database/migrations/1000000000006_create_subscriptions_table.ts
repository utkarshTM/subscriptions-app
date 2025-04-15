import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Subscriptions extends BaseSchema {
  protected tableName = 'subscriptions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('plan_id').unsigned().references('id').inTable('plans').onDelete('CASCADE')
      table.boolean('active').defaultTo(true)
      table.enum('status', ['pending', 'approved', 'expired', 'future']).defaultTo('pending')
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

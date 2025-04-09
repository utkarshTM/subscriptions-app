import { BaseSchema } from '@adonisjs/lucid/schema'

export default class AdminRequests extends BaseSchema {
  protected tableName = 'admin_requests'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('user_id').unsigned().references('id').inTable('users').notNullable()
      table.integer('society_id').unsigned().references('id').inTable('societies').notNullable()
      table.enum('status', ['pending', 'approved', 'rejected']).defaultTo('pending')
      table.integer('reviewed_by_id').unsigned().references('id').inTable('users').nullable()
      table.text('remarks').nullable()
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

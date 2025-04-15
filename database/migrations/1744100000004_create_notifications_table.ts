import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'notifications'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.text('message').notNullable()
      table
        .enum('type', [
          'promotional',
          'subscription',
          'general',
          'admin_announcement',
          'security_alert',
        ])
        .notNullable()
      table.boolean('is_read').defaultTo(false)
      table.timestamp('created_at', { useTz: true }).notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

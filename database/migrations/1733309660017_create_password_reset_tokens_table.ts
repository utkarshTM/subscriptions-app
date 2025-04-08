import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'password_reset_tokens'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary();
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE')
      table.string('email').notNullable();
      table.string('token').notNullable();
      table.timestamp('expires_at').notNullable();
      table.timestamps(true);
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
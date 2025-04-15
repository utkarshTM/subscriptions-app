// database/migrations/XXXX_access_tokens.ts
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class AccessTokens extends BaseSchema {
  protected tableName = 'access_tokens'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.string('token').notNullable().unique()
      table.timestamp('expires_at').nullable()
      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

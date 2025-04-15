// database/migrations/4_add_society_id_to_users.ts
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class AddSocietyIdToUsers extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .integer('society_id')
        .unsigned()
        .references('id')
        .inTable('societies')
        .onDelete('CASCADE')
        .notNullable()
        .after('role_id')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('society_id')
    })
  }
}

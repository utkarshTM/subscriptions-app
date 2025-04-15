import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Roles extends BaseSchema {
  protected tableName = 'roles'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.enum('name', ['owner', 'tenant', 'admin', 'super_admin']).notNullable().unique()
      table.text('description').notNullable()
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

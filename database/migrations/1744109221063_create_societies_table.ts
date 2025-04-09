import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Societies extends BaseSchema {
  protected tableName = 'societies'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name').notNullable().unique()
      table.text('address').notNullable()
      table.string('registration_number').notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users').notNullable()
      table.boolean('is_verified').defaultTo(false)
      table.boolean('is_active').defaultTo(true)
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

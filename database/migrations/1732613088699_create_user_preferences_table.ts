import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user_preferences'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE')
      table.string('do_you_smoke').nullable()
      table.string('do_you_drink').nullable()
      table.string('do_you_workout').nullable()
      table.string('have_pets').nullable()
      table.string('interested_in', 50).nullable()
      table.string('looking_for', 50).nullable()
      table.string('sexual_orientation', 50).nullable()
      table.string('diet_preference', 50).nullable()
      table.text('interests').nullable()
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
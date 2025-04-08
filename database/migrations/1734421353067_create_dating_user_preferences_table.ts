import { BaseSchema } from '@adonisjs/lucid/schema'

export default class DatingUserPreferences extends BaseSchema {
  protected tableName = 'dating_user_preferences'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.json('relationship_type').nullable()
      table.json('values_in_person').nullable()
      table.json('lifestyle_habits').nullable()
      table.string('religion').nullable()
      table.string('politics').nullable()
      table.json('causes').nullable()
      table.json('interests').nullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
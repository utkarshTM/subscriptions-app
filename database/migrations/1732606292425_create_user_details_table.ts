import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user_details'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE')
      table.string('gender', 100).nullable()
      table.date('date_of_birth').nullable()
      table.string('religion', 255).nullable()
      table.string('mother_tongue', 255).nullable()
      table.string('education', 255).nullable()
      table.string('occupation', 255).nullable()
      table.decimal('height', 5, 2).nullable()
      table.decimal('annual_income').nullable()
      table.string('state_living', 255).nullable()
      table.string('marital_status', 50).nullable()
      table.string('diet_preference', 50).nullable()
      table.string('community', 255).nullable()
      table.string('profile_created_by', 50).nullable()
      table.string('zodiac_sign', 50).nullable()
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class DatingUserDetails extends BaseSchema {
  protected tableName = 'dating_user_values'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.json('photos').nullable() 
      table.string('education').nullable()
      table.string('zodiac_sign').nullable()
      table.json('languages').nullable()
      table.string('current_city').nullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
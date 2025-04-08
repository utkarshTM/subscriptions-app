import { BaseSchema } from '@adonisjs/lucid/schema'

export default class DatingUserInterests extends BaseSchema {
  protected tableName = 'dating_user_interests'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      
      table.json('self_care').nullable()
      table.json('sports').nullable()
      table.json('creativity').nullable()
      table.json('going_out').nullable()
      table.json('staying_in').nullable()
      table.json('film_and_tv').nullable()
      table.json('reading').nullable()
      table.json('music').nullable()
      table.json('food_and_drink').nullable()
      table.json('travelling').nullable()
      table.json('pets').nullable()
      table.json('personality_and_traits').nullable()
      table.string('drinking').nullable()
      table.string('smoking').nullable()
      
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

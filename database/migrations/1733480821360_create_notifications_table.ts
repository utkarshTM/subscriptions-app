import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'notifications'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().notNullable() 
      table.text('message').notNullable() 
      table.boolean('is_read').defaultTo(false)
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now()) 
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now()) 

      table.foreign('user_id').references('users.id').onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class FlatOccupancyHistories extends BaseSchema {
  protected tableName = 'flat_occupancy_histories'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('flat_id').unsigned().references('id').inTable('society_flats').notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users').notNullable()
      table.date('start_date').notNullable()
      table.date('end_date').nullable()
      table.enum('user_type', ['owner', 'tenant']).notNullable()
      table.text('remarks').nullable()
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

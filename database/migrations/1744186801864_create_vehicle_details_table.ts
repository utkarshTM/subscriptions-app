import { BaseSchema } from '@adonisjs/lucid/schema'

export default class VehicleDetails extends BaseSchema {
  protected tableName = 'vehicle_details'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table
        .integer('flat_id')
        .unsigned()
        .references('id')
        .inTable('society_flats')
        .onDelete('CASCADE')
      table.string('vehicle_number').notNullable()
      table.enum('vehicle_type', ['2-wheeler', '4-wheeler', 'electric', 'other']).notNullable()
      table.boolean('is_active').defaultTo(true)
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

import { BaseSchema } from '@adonisjs/lucid/schema'

export default class SocietyAmenities extends BaseSchema {
  protected tableName = 'society_amenities'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('society_id').unsigned().references('id').inTable('societies').notNullable()
      table.string('name', 255).notNullable()
      table.text('description').notNullable()
      table.integer('count').unsigned().defaultTo(1)
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

import { BaseSchema } from '@adonisjs/lucid/schema'

export default class SocietyFlats extends BaseSchema {
  protected tableName = 'society_flats'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('society_id').unsigned().references('id').inTable('societies').notNullable()
      table.integer('block_id').unsigned().references('id').inTable('society_blocks').notNullable()
      table.string('flat_number', 50).notNullable()
      table.enum('flat_type', ['1BHK', '2BHK', '3BHK', 'Penthouse']).notNullable()
      table.boolean('is_occupied').defaultTo(false)
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()

      // Composite unique constraint
      table.unique(['society_id', 'block_id', 'flat_number'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

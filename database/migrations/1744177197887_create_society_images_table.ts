import { BaseSchema } from '@adonisjs/lucid/schema'

export default class SocietyImages extends BaseSchema {
  protected tableName = 'society_images'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('society_id').unsigned().references('id').inTable('societies').notNullable()
      table.text('image_url').notNullable()
      table.text('caption')
      table.integer('uploaded_by_id').unsigned().references('id').inTable('users').notNullable()
      table.timestamp('created_at', { useTz: true }).notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

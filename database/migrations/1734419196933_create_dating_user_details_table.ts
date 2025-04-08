import { BaseSchema } from '@adonisjs/lucid/schema'

export default class DatingUserDetails extends BaseSchema {
  protected tableName = 'dating_user_details'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary();
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
      table.string('email').nullable();
      table.string('gender').nullable();
      table.text('pronouns').nullable(); 
      table.string('sexual_orientation').nullable();
      table.string('height').nullable();
      table.string('height_unit').nullable();
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
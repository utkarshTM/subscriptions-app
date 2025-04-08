import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'user_addresses';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id'); 
      table.string('address').nullable();
      table.string('city').nullable();
      table.string('state').nullable(); 
      table.string('postal_code', 6).nullable(); 
      table.string('country').nullable(); 
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE'); 

      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now()); 
      table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now()); 
    });
  }

  async down() {
    this.schema.dropTable(this.tableName); 
  }
}

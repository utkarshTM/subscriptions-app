import { BaseSchema } from '@adonisjs/lucid/schema'

export default class TenantProfiles extends BaseSchema {
  protected tableName = 'tenant_profiles'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('user_id').unsigned().references('id').inTable('users').notNullable().unique()
      table.integer('owner_id').unsigned().references('id').inTable('users').notNullable()
      table.string('occupation', 255).notNullable()
      table.integer('flat_id').unsigned().references('id').inTable('society_flats').notNullable()
      table.integer('block_id').unsigned().references('id').inTable('society_blocks').notNullable()
      table.boolean('living').defaultTo(true)
      table.enum('status', ['pending', 'approved', 'rejected']).defaultTo('pending')
      table.integer('approved_by_id').unsigned().references('id').inTable('users').nullable()
      table.text('remarks').nullable()
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

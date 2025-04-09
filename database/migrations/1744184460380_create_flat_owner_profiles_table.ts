import { BaseSchema } from '@adonisjs/lucid/schema'

export default class FlatOwnerProfiles extends BaseSchema {
  protected tableName = 'flat_owner_profiles'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('user_id').unsigned().references('id').inTable('users').notNullable().unique()
      table.date('possession_date').nullable()
      table.date('flat_purchase_date').nullable()
      table.string('occupation', 255).notNullable()
      table.enum('user_type', ['owner', 'tenant']).notNullable()
      table.integer('flat_id').unsigned().references('id').inTable('society_flats').notNullable()
      table.integer('block_id').unsigned().references('id').inTable('society_blocks').notNullable()
      table.boolean('living').defaultTo(false)
      table.integer('parking_allotted').unsigned().defaultTo(0)
      table.integer('created_by_id').unsigned().references('id').inTable('users').nullable()
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

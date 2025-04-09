import { BaseSchema } from '@adonisjs/lucid/schema'

export default class SocietyBoardMembers extends BaseSchema {
  protected tableName = 'society_board_members'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('society_id').unsigned().references('id').inTable('societies').notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users').notNullable()
      table.string('designation', 100).notNullable()
      table.date('tenure_start').notNullable()
      table.date('tenure_end').nullable()
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

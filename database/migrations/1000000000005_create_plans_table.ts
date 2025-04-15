import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Plans extends BaseSchema {
  protected tableName = 'plans'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name').notNullable()
      table.enum('interval', ['monthly', 'quarterly', 'half-yearly', 'annually']).notNullable()
      table.decimal('amount', 10, 2).notNullable()
      table.boolean('active').defaultTo(true)
      table.text('description').notNullable()
      table.integer('plan_order')
      table.boolean('is_popular').defaultTo(false)
      table.enum('plan_type', ['recurring', 'one_time']).notNullable()
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

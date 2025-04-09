import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name').notNullable()
      table.string('email').notNullable().unique()
      table.string('phone').notNullable().unique()
      table.string('password_hash').notNullable()
      table
        .integer('role_id')
        .unsigned()
        .references('id')
        .inTable('roles')
        .onDelete('CASCADE')
        .notNullable()
      table
        .integer('society_id')
        .unsigned()
        .references('id')
        .inTable('societies')
        .onDelete('CASCADE')
        .notNullable()
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

// import { BaseSchema } from '@adonisjs/lucid/schema'

// export default class UpdateUsersTable extends BaseSchema {
//   protected tableName = 'users'

//   async up() {
//     this.schema.alterTable(this.tableName, (table) => {
//       table.renameColumn('password', 'password_hash')
//       table.integer('role_id').unsigned().references('id').inTable('roles').notNullable()
//       table.integer('society_id').unsigned().references('id').inTable('societies').nullable()
//     })
//   }

//   async down() {
//     this.schema.alterTable(this.tableName, (table) => {
//       table.renameColumn('password_hash', 'password')
//       table.dropColumn('role_id')
//       table.dropColumn('society_id')
//     })
//   }
// }

// import { BaseSchema } from '@adonisjs/lucid/schema'

// export default class Users extends BaseSchema {
//   protected tableName = 'users'

//   async up() {
//     this.schema.createTable(this.tableName, (table) => {
//       table.increments('id').primary()
//       table.string('email', 255).notNullable().unique()
//       table.string('password', 180).notNullable()
//       table.string('first_name', 255).notNullable()
//       table.string('last_name', 255).notNullable()
//       table.string('phone', 15).nullable().unique()
//       table.timestamp('created_at', { useTz: true }).notNullable()
//       table.timestamp('updated_at', { useTz: true }).notNullable()
//     })
//   }

//   async down() {
//     this.schema.dropTable(this.tableName)
//   }
// }

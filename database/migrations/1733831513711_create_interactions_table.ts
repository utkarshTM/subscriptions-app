// import { BaseSchema } from '@adonisjs/lucid/schema'

// export default class extends BaseSchema {
//   protected tableName = 'interactions'

//   async up() {
//     this.schema.createTable(this.tableName, (table) => {
//       table.increments('id')

//       table.timestamp('created_at')
//       table.timestamp('updated_at')
//     })
//   }

//   async down() {
//     this.schema.dropTable(this.tableName)
//   }
// }
// import { BaseSchema } from '@adonisjs/lucid/schema'

// export default class extends BaseSchema {
//   protected tableName = 'interactions'

//   async up() {
//     this.schema.createTable('interactions', (table) => {
//       table.increments('id')
//       table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE')
//       table.integer('target_user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
//       table.enu('type', ['like', 'superlike']).notNullable()
//       table.timestamp('created_at', { useTz: true }).notNullable()
//       table.timestamp('updated_at', { useTz: true }).notNullable()
//     })
//   }

//   async down() {
//     this.schema.dropTable(this.tableName)
//   }
// }
import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'interactions';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
      table.integer('target_user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
      table
        .enu('type', ['like', 'superlike', 'likeBack', 'superLikeBack'])
        .notNullable();
      table.boolean('checked').defaultTo(false); 
      table.timestamp('created_at', { useTz: true }).notNullable();
      table.timestamp('updated_at', { useTz: true }).notNullable();
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}

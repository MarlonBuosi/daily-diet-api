import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('meals', (table) => {
    table.uuid('mealId').primary()
    table.uuid('createdBy').notNullable()
    table.string('name').notNullable()
    table.string('description').notNullable()
    table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable()
    table.boolean('isDiet').notNullable()
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('meals')
}


import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('tokens', (table: Knex.TableBuilder) => {
    table.string('id').primary();
    table.string('token').notNullable();
    table
      .string('userId')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('tokens');
}

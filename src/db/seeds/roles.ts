import { Knex } from 'knex';
import { v4 as uuidv4 } from 'uuid';

export async function seed(knex: Knex): Promise<void> {
  try {
    await knex.transaction(async (trx) => {
      await trx.raw('TRUNCATE TABLE roles RESTART IDENTITY CASCADE');

      await trx('roles').insert([
        { id: '1', userRole: 'member' },
        { id: '2', userRole: 'admin' },
        { id: '3', userRole: 'super admin' },
      ]);
    });
  } catch (error) {
    console.error('Error seeding roles:', error);
  }
}

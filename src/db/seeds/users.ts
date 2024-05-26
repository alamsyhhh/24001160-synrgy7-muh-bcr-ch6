import { Knex } from 'knex';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

export async function seed(knex: Knex): Promise<void> {
  await knex('users').del();

  await knex('users').insert([
    {
      id: uuidv4(),
      username: 'andi',
      email: 'member@gmail.com',
      password: await bcrypt.hash('member12345', 10),
      roleId: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      username: 'firman',
      email: 'admin@gmail.com',
      password: await bcrypt.hash('admin12345', 10),
      roleId: '2',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      username: 'rizki',
      email: 'sAdmin@gmail.com',
      password: await bcrypt.hash('sadmin12345', 10),
      roleId: '3',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}

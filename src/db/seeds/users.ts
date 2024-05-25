import { Knex } from 'knex';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

export async function seed(knex: Knex): Promise<void> {
  // Hapus semua data dari tabel users
  await knex('users').del();

  // Masukkan entri seed
  await knex('users').insert([
    {
      id: uuidv4(),
      username: 'member',
      email: 'member@gmail.com',
      password: await bcrypt.hash('member12345', 10),
      roleId: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      username: 'admin',
      email: 'admin@gmail.com',
      password: await bcrypt.hash('admin12345', 10),
      roleId: '2',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      username: 'super admin',
      email: 'sAdmin@gmail.com',
      password: await bcrypt.hash('sadmin12345', 10),
      roleId: '3',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}

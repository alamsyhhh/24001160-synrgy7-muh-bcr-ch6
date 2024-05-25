import { config } from 'dotenv';
import knex from 'knex';

config();
const knexInstance = knex({
  client: 'postgresql',
  connection: {
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
});

export { knexInstance };

import { Pool } from 'pg';
import dotenv from 'dotenv';

export const pool = new Pool({
  host: process.env.DB_HOST || 'docker',
  user: process.env.DB_USER || 'myuser',
  password: process.env.DB_PASSWORD || 'mypassword',
  database: process.env.DB_NAME || 'mydatabase',
  port: process.env.DB_PORT || 5432,
});
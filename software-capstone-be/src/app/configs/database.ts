import { SqlError, createPool } from 'mariadb';
import {
  DB_PORT,
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_CONNECTION_LIMIT,
} from '../constants/config_constants';

const pool = createPool({
  port: DB_PORT,
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  connectionLimit: DB_CONNECTION_LIMIT,
});

// Attempt to catch disconnects
pool.on('connection', connection => {
  console.log('DB Connection established');

  connection.on('error', (err: SqlError) => {
    console.error(new Date(), 'MariaDB error', err.code);
  });
  connection.on('end', () => {
    console.error(new Date(), 'MariaDB end');
  });
});

export {
  pool,
}

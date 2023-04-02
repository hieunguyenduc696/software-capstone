import { createPool } from 'mysql';
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
pool.on('connection', function (connection) {
  console.log('DB Connection established');

  connection.on('error', function (err: any) {
    console.error(new Date(), 'MySQL error', err.code);
  });
  connection.on('close', function (err: any) {
    console.error(new Date(), 'MySQL close', err);
  });
});

export {
  pool,
}

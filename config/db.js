import pkg from 'pg';
const { Pool } = pkg
import 'dotenv/config';
const { DB_HOST, DB_PASS, DB_DATABASE, DB_USER } = process.env;
const config = {
    user: DB_USER,
    password: DB_PASS,
    host: DB_HOST,
    database: DB_DATABASE,
    allowExitOnIdle: true,
}
const pool = new Pool(config);
export { pool };
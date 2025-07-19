import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
})

// pool.connect().then(() => {
//     console.log('Connected to the Postgres database');
// }).catch(err => {
//     console.error('Postgres Database connection error:', err);
// });

export default pool; 
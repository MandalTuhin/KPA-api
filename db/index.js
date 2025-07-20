import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    // Add SSL configuration for production environments.
    // This is a common requirement for cloud-based PostgreSQL providers.
    ssl:
        process.env.NODE_ENV === 'production'
            ? { rejectUnauthorized: false }
            : false,
});
 
// Add a global error listener to the pool
// This will log any errors on idle clients and prevent the app from crashing.
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1); // A common practice is to restart the app on a fatal pool error
});
 
export default pool;
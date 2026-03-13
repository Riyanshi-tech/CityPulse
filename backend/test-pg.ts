import { Pool } from 'pg';
import 'dotenv/config';

async function main() {
  const connectionString = process.env.DATABASE_URL?.trim();
  console.log("Connection String ends with:", connectionString?.substring(connectionString.length - 20));
  
  if (!connectionString) {
    console.error("DATABASE_URL is not defined!");
    return;
  }

  const pool = new Pool({ 
    connectionString,
    ssl: {
      rejectUnauthorized: false
    }
  });
  
  try {
    const client = await pool.connect();
    console.log("Successfully connected to the database!");
    const res = await client.query('SELECT NOW()');
    console.log("Query result:", res.rows[0]);
    client.release();
  } catch (err) {
    console.error("Failed to connect to the database:");
    console.error(err);
  } finally {
    await pool.end();
  }
}

main();

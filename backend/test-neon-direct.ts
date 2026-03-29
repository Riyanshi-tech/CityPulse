import { Pool } from 'pg';
import 'dotenv/config';

async function main() {
  const connectionString = "postgresql://neondb_owner:npg_s25NORlbIcFt@ep-royal-bonus-aiaiyglb.us-east-1.aws.neon.tech/neondb?sslmode=require";
  console.log("Testing direct connection to Neon...");
  
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

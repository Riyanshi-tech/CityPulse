import 'dotenv/config'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

const connectionString = process.env.DATABASE_URL?.trim();

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined");
}

const pool = new Pool({ 
  connectionString,
  ssl: {
    rejectUnauthorized: false // Often needed for Neon in some environments
  }
})
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

export default prisma;
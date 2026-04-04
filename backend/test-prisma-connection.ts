import * as dotenv from 'dotenv';
dotenv.config();
import { prisma } from './src/lib/prisma';

async function main() {
  try {
    console.log('Testing database connection...');
    // Simple query to check connection
    const result = await prisma.$queryRaw`SELECT 1 as result`;
    console.log('Database connection successful:', result);
    process.exit(0);
  } catch (error) {
    console.error('Database connection failed:', error);
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      // @ts-ignore
      if (error.cause) console.error('Error cause:', error.cause);
    }
    process.exit(1);
  }
}

main();

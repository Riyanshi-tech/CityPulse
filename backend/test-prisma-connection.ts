import prisma from './src/lib/prisma';

async function main() {
  try {
    console.log('Testing database connection...');
    // Simple query to check connection
    const result = await prisma.$queryRaw`SELECT 1 as result`;
    console.log('Database connection successful:', result);
    process.exit(0);
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
}

main();

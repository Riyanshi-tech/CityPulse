import { PrismaClient } from './src/generated/prisma';

const prisma = new PrismaClient();

async function checkSchema() {
  try {
    const tableStructure = await prisma.$queryRaw`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'EventSeat'
    `;
    console.log(JSON.stringify(tableStructure, null, 2));
  } catch (error) {
    console.error('Error checking schema:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkSchema();

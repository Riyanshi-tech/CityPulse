import prisma from './src/lib/prisma';

async function main() {
  try {
    const users = await prisma.user.findMany();
    console.log(users);
  } catch (error) {
    console.error("Error occurred:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();

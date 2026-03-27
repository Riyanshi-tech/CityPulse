import prisma from './src/lib/prisma';

async function main() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
      }
    });
    console.log("Existing Users:", JSON.stringify(users, null, 2));
  } catch (error) {
    console.error("Error fetching users:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();

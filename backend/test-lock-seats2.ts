import prisma from './src/lib/prisma';

async function main() {
  try {
    const eventId = 1;
    const seatType = 'REGULAR';
    const quantity = 1;

    console.log('Fetching seats...');
    const seats = await prisma.eventSeat.findMany({
      where: { eventId, seat: { seatType }, status: "AVAILABLE" },
      take: quantity
    });
    console.log(`Found ${seats.length} seats:`, seats.map(s => s.id));

    if (seats.length === 0) {
      console.log('No seats available');
      return;
    }

    const seatIds = seats.map(seat => seat.id);
    console.log('Updating seats...', seatIds);
    const result = await prisma.eventSeat.updateMany({
      where: { id: { in: seatIds } },
      data: { status: "LOCKED", lockedAt: new Date() }
    });
    console.log('Updated:', result);
    
  } catch (error: any) {
    console.error('Error Code:', error.code);
    console.error('Error Message:', error.message);
  }
}

main().then(() => prisma.$disconnect());

import prisma from './src/lib/prisma';
import { createBooking, createPaymentService } from './src/services/booking.service';

async function testExpiration() {
  const userId = 38;
  const eventId = 1;
  
  try {
    // 1. Find some available seats
    const seats = await prisma.eventSeat.findMany({
      where: { eventId, status: 'AVAILABLE' },
      take: 2
    });

    if (seats.length === 0) {
      console.log('No available seats found for event 1. Please ensure event 1 has seats.');
      return;
    }

    const seatIds = seats.map(s => s.id);
    console.log('Selected seats:', seatIds);

    // 2. Lock seats first (as required by createBooking)
    await prisma.eventSeat.updateMany({
      where: { id: { in: seatIds } },
      data: { status: 'LOCKED', lockedById: userId, lockedAt: new Date() }
    });
    console.log('Seats locked manually.');

    // 3. Create booking
    const booking = await createBooking(userId, eventId, seatIds);
    console.log('Booking created:', booking.id);
    console.log('ExpiresAt:', booking.expiresAt);

    // Verify expiresAt is approx 15 minutes from now
    const now = new Date();
    const diffMin = (booking.expiresAt!.getTime() - now.getTime()) / (60 * 1000);
    console.log(`Expiration difference: ${diffMin.toFixed(2)} minutes`);

    if (diffMin > 14 && diffMin <= 15.1) {
      console.log('✅ PASS: Expiration is set to ~15 minutes.');
    } else {
      console.log('❌ FAIL: Expiration is NOT set to 15 minutes.');
    }

    // 4. Test createPaymentService
    console.log('Testing createPaymentService...');
    try {
        // This will try to create a Razorpay order, might fail if keys are missing
        // but we mainly care about the "Booking expired" check which happens BEFORE Razorpay
        const payment = await createPaymentService(booking.id, userId);
        console.log('Payment created (or Razorpay skipped if keys missing):', !!payment);
    } catch (err: any) {
        if (err.message === 'Booking expired') {
            console.log('❌ FAIL: Booking wrongly considered expired.');
        } else {
            console.log('Caught expected or other error:', err.message);
            // If it's a Razorpay error, it means the expiration check PASSED.
            if (err.message.includes('Razorpay') || err.message.includes('key')) {
                console.log('✅ PASS: Expiration check passed (failed later at Razorpay as expected).');
            }
        }
    }

  } catch (error: any) {
    console.error('Test failed with error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

testExpiration();

import { lockSeats } from './src/services/booking.service';

async function main() {
  try {
    const seats = await lockSeats(1, 'REGULAR', 1);
    console.log('Success:', seats);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();

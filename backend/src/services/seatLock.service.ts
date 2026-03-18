import prisma from "../lib/prisma";
export const lockSeats = async (
  eventId: number,
  seatIds: string[],
  userId: number
) => {

  const LOCK_DURATION = 5 * 60 * 1000; 
  const now = new Date();
  const seats = await prisma.eventSeat.findMany({
    where: {
      eventId,
      seatId: { in: seatIds }
    }
  });

  if (seats.length !== seatIds.length) {
    throw new Error("Some seats not found");
  }
  for (const seat of seats) {
    if (seat.status === "BOOKED") {
      throw new Error("Seat already booked");
    }
    if (
      seat.status === "LOCKED" &&
      seat.lockedAt &&
      new Date(seat.lockedAt).getTime() + LOCK_DURATION > now.getTime()
    ) {
      throw new Error("Seat already locked");
    }
  }
  await prisma.eventSeat.updateMany({
    where: {
      eventId,
      seatId: { in: seatIds }
    },
    data: {
      status: "LOCKED",
      lockedAt: now
    }
  });

  return { message: "Seats locked successfully" };
};
import prisma from "../lib/prisma";

export const lockSeats = async (
  eventId: number,
  seatType: "VIP" | "REGULAR" | "BALCONY",
  quantity: number
) => {

  return prisma.$transaction(async (tx) => {
    const seats = await tx.eventSeat.findMany({
      where: {
        eventId,
        seat: {
          seatType
        },
        status: "AVAILABLE"
      },
      take: quantity
    });
    if (seats.length < quantity) {
      throw new Error("Not enough seats available");
    }

    const seatIds = seats.map(seat => seat.id);
    await tx.eventSeat.updateMany({
      where: {
        id: { in: seatIds }
      },
      data: {
        status: "LOCKED",
        lockedAt: new Date()
      }
    });

    return seats;
  });

};
import prisma from "../lib/prisma";

export const createEventSeats = async (eventId: number, venueId: number) => {
  const seats = await prisma.seat.findMany({
    where: { venueId }
  });

  if (!seats.length) {
    throw new Error("No seats found for this venue");
  }

  
  const eventSeatsData = seats.map((seat) => ({
    eventId,
    seatId: seat.id,
  }));

  
  await prisma.eventSeat.createMany({
    data: eventSeatsData,
  });

  return { message: "Event seats created successfully" };
};
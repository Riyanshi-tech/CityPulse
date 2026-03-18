import prisma from "../lib/prisma";
import { createEventSeats } from "./eventSeat.service";

export const createEventService = async (data: any, organizerId: number) => {

  const event = await prisma.events.create({
    data: {
      title: data.title,
      description: data.description,
      category: data.category,
      startDateTime: new Date(data.startDateTime),
      endDateTime: new Date(data.endDateTime),
      city: data.city,
      address: data.address,
      totalTickets: data.totalTickets,
      organizerId: organizerId,
      venueId: data.venueId
    }
  });

  await createEventSeats(event.id, data.venueId);

  return event;
};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEventSeats = void 0;
const prisma_1 = require("../lib/prisma");
const client_1 = require("@prisma/client");
const createEventSeats = async (eventId, venueId) => {
    const seats = await prisma_1.prisma.seat.findMany({
        where: { venueId }
    });
    if (!seats.length) {
        throw new Error("No seats found for this venue");
    }
    const eventSeatsData = seats.map((seat, index) => ({
        eventId,
        seatId: seat.id,
        status: client_1.SeatStatus.AVAILABLE,
        seatType: seat.seatType,
        seatNumber: index + 1,
    }));
    await prisma_1.prisma.eventSeat.createMany({
        data: eventSeatsData,
    });
    return { message: "Event seats created successfully" };
};
exports.createEventSeats = createEventSeats;
//# sourceMappingURL=eventSeat.service.js.map
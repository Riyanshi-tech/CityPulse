"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVenueSeats = void 0;
const prisma_1 = require("../lib/prisma");
const createVenueSeats = async (venueId, seatType, count) => {
    const seats = [];
    for (let i = 0; i < count; i++) {
        seats.push({
            seatType,
            venueId
        });
    }
    return await prisma_1.prisma.seat.createMany({
        data: seats
    });
};
exports.createVenueSeats = createVenueSeats;
//# sourceMappingURL=seat.service.js.map
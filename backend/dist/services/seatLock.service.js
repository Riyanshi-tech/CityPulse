"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lockSeats = void 0;
const prisma_1 = require("../lib/prisma");
const booking_service_1 = require("./booking.service");
const TX_TIMEOUT = { timeout: 30000 };
const lockSeats = async (eventId, seatIds, userId) => {
    await (0, booking_service_1.expireBookingsService)();
    return prisma_1.prisma.$transaction(async (tx) => {
        const LOCK_DURATION = 15 * 60 * 1000;
        const now = new Date();
        await tx.eventSeat.updateMany({
            where: {
                eventId,
                status: "LOCKED",
                lockedAt: {
                    lt: new Date(Date.now() - LOCK_DURATION)
                }
            },
            data: {
                status: "AVAILABLE",
                lockedAt: null,
                lockedById: null
            }
        });
        const seats = await tx.eventSeat.findMany({
            where: {
                eventId,
                id: { in: seatIds }
            }
        });
        if (seats.length !== seatIds.length) {
            throw new Error("Some seats not found");
        }
        for (const seat of seats) {
            if (seat.status === "BOOKED") {
                throw new Error("Seat already booked");
            }
            if (seat.status === "LOCKED" &&
                seat.lockedAt &&
                new Date(seat.lockedAt).getTime() + LOCK_DURATION > now.getTime() &&
                seat.lockedById !== userId) {
                throw new Error("Seat already locked by another user");
            }
        }
        await tx.eventSeat.updateMany({
            where: {
                eventId,
                id: { in: seatIds }
            },
            data: {
                status: "LOCKED",
                lockedAt: now,
                lockedById: userId
            }
        });
        return await tx.eventSeat.findMany({
            where: {
                eventId,
                id: { in: seatIds }
            }
        });
    }, TX_TIMEOUT);
};
exports.lockSeats = lockSeats;
//# sourceMappingURL=seatLock.service.js.map
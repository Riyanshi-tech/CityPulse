"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expireBookingsService = exports.confirmPaymentService = exports.createPaymentService = exports.createBooking = void 0;
const prisma_1 = require("../lib/prisma");
const razorpay_1 = require("../lib/razorpay");
const verify_1 = require("../utils/verify");
const qrCode_1 = require("../utils/qrCode");
const TX_TIMEOUT = { maxWait: 10000, timeout: 30000 };
const createBooking = async (userId, eventId, seatIds) => {
    await (0, exports.expireBookingsService)();
    return prisma_1.prisma.$transaction(async (tx) => {
        const seats = await tx.eventSeat.findMany({
            where: {
                id: { in: seatIds },
                eventId
            }
        });
        if (seats.length !== seatIds.length) {
            throw new Error("Some seats not found");
        }
        for (const seat of seats) {
            if (seat.status !== "LOCKED") {
                throw new Error("Seat is not locked");
            }
        }
        const totalAmount = seats.length * 100;
        const booking = await tx.booking.create({
            data: {
                userId,
                eventId,
                totalAmount,
                status: "PENDING_PAYMENT",
                expiresAt: new Date(Date.now() + 15 * 60 * 1000)
            }
        });
        await tx.eventSeat.updateMany({
            where: {
                id: { in: seatIds }
            },
            data: {
                bookingId: booking.id
            }
        });
        return booking;
    }, TX_TIMEOUT);
};
exports.createBooking = createBooking;
const createPaymentService = async (bookingId, userId) => {
    await (0, exports.expireBookingsService)();
    const booking = await prisma_1.prisma.booking.findUnique({
        where: { id: bookingId },
        include: {
            eventSeats: true
        }
    });
    if (!booking)
        throw new Error("Booking not found");
    if (booking.userId !== userId)
        throw new Error("Unauthorized");
    if (booking.status !== "PENDING_PAYMENT")
        throw new Error("Invalid booking status");
    const now = new Date();
    if (booking.expiresAt && booking.expiresAt < now) {
        console.error(`[Booking Expired] ID: ${bookingId}, ExpiresAt: ${booking.expiresAt.toISOString()}, Now: ${now.toISOString()}`);
        throw new Error("Booking expired");
    }
    const order = await razorpay_1.razorpayInstance.orders.create({
        amount: booking.totalAmount * 100,
        currency: "INR",
        receipt: bookingId
    });
    const payment = await prisma_1.prisma.payment.create({
        data: {
            bookingId: booking.id,
            userId: booking.userId,
            amount: booking.totalAmount,
            status: "CREATED",
            gateway: "RAZORPAY",
            gatewayOrderId: order.id
        }
    });
    return { payment, order };
};
exports.createPaymentService = createPaymentService;
const confirmPaymentService = async (bookingId, paymentId, razorpay_order_id, razorpay_payment_id, userId, signature) => {
    const isSignatureValid = (0, verify_1.verifyRazorpaySignature)(razorpay_order_id, razorpay_payment_id, signature);
    if (!isSignatureValid) {
        throw new Error("Invalid payment signature");
    }
    return prisma_1.prisma.$transaction(async (tx) => {
        const booking = await tx.booking.findUnique({
            where: { id: bookingId },
            include: { eventSeats: true }
        });
        if (!booking)
            throw new Error("Booking not found");
        if (booking.userId !== userId)
            throw new Error("Unauthorized");
        if (booking.status !== "PENDING_PAYMENT")
            throw new Error("Invalid booking status");
        if (booking.expiresAt && booking.expiresAt < new Date())
            throw new Error("Booking expired");
        for (const seat of booking.eventSeats) {
            if (seat.status !== "LOCKED") {
                throw new Error("Seat is not locked");
            }
        }
        await tx.payment.updateMany({
            where: { id: paymentId },
            data: {
                status: "SUCCESS",
                gatewayPaymentId: razorpay_payment_id,
                gatewaySignature: signature,
                completedAt: new Date()
            },
        });
        await tx.booking.update({
            where: { id: bookingId },
            data: {
                status: "CONFIRMED",
                confirmedAt: new Date()
            }
        });
        for (const seat of booking.eventSeats) {
            await tx.eventSeat.update({
                where: { id: seat.id },
                data: {
                    status: "BOOKED",
                    lockedAt: null,
                    lockedById: null
                }
            });
        }
        const ticketsData = [];
        for (const seat of booking.eventSeats) {
            const ticketCode = `TICKET-${Date.now()}-${seat.id}`;
            const qrData = JSON.stringify({
                ticketCode,
                eventId: booking.eventId,
                userId: booking.userId,
                seatId: seat.id
            });
            const qrCodeImage = await (0, qrCode_1.generateQRCode)(qrData);
            ticketsData.push({
                bookingId,
                eventSeatId: seat.id,
                userId: booking.userId,
                eventId: booking.eventId,
                ticketCode,
                qrCodeData: qrCodeImage
            });
        }
        await tx.ticket.createMany({
            data: ticketsData
        });
    }, TX_TIMEOUT);
};
exports.confirmPaymentService = confirmPaymentService;
const expireBookingsService = async () => {
    const now = new Date();
    const expiredBookings = await prisma_1.prisma.booking.findMany({
        where: {
            status: "PENDING_PAYMENT",
            expiresAt: {
                lt: now
            }
        },
        include: {
            eventSeats: true
        }
    });
    if (expiredBookings.length === 0)
        return;
    for (const booking of expiredBookings) {
        await prisma_1.prisma.$transaction(async (tx) => {
            await tx.booking.update({
                where: { id: booking.id },
                data: {
                    status: "EXPIRED"
                }
            });
            for (const seat of booking.eventSeats) {
                await tx.eventSeat.update({
                    where: { id: seat.id },
                    data: {
                        status: "AVAILABLE",
                        lockedAt: null,
                        bookingId: null,
                        lockedById: null
                    }
                });
            }
        }, TX_TIMEOUT);
    }
};
exports.expireBookingsService = expireBookingsService;
//# sourceMappingURL=booking.service.js.map
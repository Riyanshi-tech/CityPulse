"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTicketsByBookingIdService = exports.scanTicketService = void 0;
const prisma_1 = require("../lib/prisma");
const scanTicketService = async (ticketCode) => {
    const ticket = await prisma_1.prisma.ticket.findUnique({
        where: { ticketCode }
    });
    if (!ticket) {
        throw new Error("Invalid ticket");
    }
    if (ticket.status === "SCANNED") {
        throw new Error("Ticket already used");
    }
    if (ticket.status === "CANCELLED") {
        throw new Error("Ticket cancelled");
    }
    if (ticket.status === "EXPIRED") {
        throw new Error("Ticket expired");
    }
    const updatedTicket = await prisma_1.prisma.ticket.update({
        where: { id: ticket.id },
        data: {
            status: "SCANNED",
            scannedAt: new Date()
        }
    });
    return {
        message: "Entry allowed",
        ticket: updatedTicket
    };
};
exports.scanTicketService = scanTicketService;
const getTicketsByBookingIdService = async (bookingId) => {
    const tickets = await prisma_1.prisma.ticket.findMany({
        where: { bookingId },
        include: {
            event: true,
            eventSeat: {
                include: { seat: true }
            }
        }
    });
    return tickets;
};
exports.getTicketsByBookingIdService = getTicketsByBookingIdService;
//# sourceMappingURL=ticket.service.js.map
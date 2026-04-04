"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyTickets = exports.getTicketsByBookingIdController = exports.scanTicketController = void 0;
const prisma_1 = require("../lib/prisma");
const ticket_service_1 = require("../services/ticket.service");
const scanTicketController = async (req, res) => {
    try {
        const { ticketCode } = req.body;
        if (!ticketCode) {
            return res.status(400).json({
                message: "ticketCode is required"
            });
        }
        const result = await (0, ticket_service_1.scanTicketService)(ticketCode);
        res.json(result);
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};
exports.scanTicketController = scanTicketController;
const getTicketsByBookingIdController = async (req, res) => {
    try {
        const bookingId = req.params.bookingId;
        const tickets = await (0, ticket_service_1.getTicketsByBookingIdService)(bookingId);
        res.json(tickets);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.getTicketsByBookingIdController = getTicketsByBookingIdController;
const getMyTickets = async (req, res) => {
    try {
        const userId = req.user.id;
        const tickets = await prisma_1.prisma.ticket.findMany({
            where: { userId },
            include: {
                event: true,
                eventSeat: {
                    include: { seat: true }
                }
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        res.json(tickets);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch tickets" });
    }
};
exports.getMyTickets = getMyTickets;
//# sourceMappingURL=ticket.controller.js.map
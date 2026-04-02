import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { scanTicketService, getTicketsByBookingIdService } from "../services/ticket.service";

export const scanTicketController = async (req: Request, res: Response) => {
  try {
    const { ticketCode } = req.body;

    if (!ticketCode) {
      return res.status(400).json({
        message: "ticketCode is required"
      });
    }

    const result = await scanTicketService(ticketCode);

    res.json(result);

  } catch (error: any) {
    res.status(400).json({
      message: error.message
    });
  }
};

export const getTicketsByBookingIdController = async (req: Request, res: Response) => {
  try {
    const bookingId = req.params.bookingId as string;
    const tickets = await getTicketsByBookingIdService(bookingId);
    res.json(tickets);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
export const getMyTickets = async (req: any, res: any) => {
  try {
    const userId = req.user.id;

    const tickets = await prisma.ticket.findMany({
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

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tickets" });
  }
};
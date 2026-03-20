import { Request, Response } from "express";
import { scanTicketService } from "../services/ticket.service";

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
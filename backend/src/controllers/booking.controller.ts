import { Request, Response } from "express";
import { lockSeats } from "../services/booking.service";

export const lockSeatsController = async (req: Request, res: Response) => {

  try {

    const eventId = Number(req.params.eventId);
    const { seatType, quantity } = req.body;

    const seats = await lockSeats(eventId, seatType, quantity);

    res.json({
      message: "Seats locked successfully",
      seats
    });

  } catch (error: any) {

    res.status(400).json({
      message: error.message
    });

  }

};
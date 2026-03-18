import { Request, Response } from "express";
import { lockSeats } from "../services/seatLock.service";

export const lockSeatsController = async (req: Request, res: Response) => {
  try {
    const eventId = Number(req.params.eventId);
    const { seatIds } = req.body;

    const userId = (req as any).user.id;  

    const result = await lockSeats(eventId, seatIds, userId);

    res.json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
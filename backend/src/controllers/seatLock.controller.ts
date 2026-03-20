import { Response } from "express";
import { lockSeats } from "../services/seatLock.service";
import { AuthRequest } from "../middlewares/auth.middleware";

export const lockSeatsController = async (req: AuthRequest, res: Response) => {
  try {
    const eventId = Number(req.params.eventId);
    const { seatIds } = req.body;
    const userId = req.user.id;

    // ✅ Validate eventId
    if (isNaN(eventId)) {
      return res.status(400).json({
        message: "Invalid eventId"
      });
    }

    // ✅ Validate seatIds
    if (!seatIds || !Array.isArray(seatIds) || seatIds.length === 0) {
      return res.status(400).json({
        message: "seatIds must be a non-empty array"
      });
    }

    const result = await lockSeats(eventId, seatIds, userId);

    res.json(result);

  } catch (error: any) {

    if (
      error.message === "Seat already booked" ||
      error.message.includes("locked")
    ) {
      return res.status(400).json({ message: error.message });
    }

    res.status(500).json({
      message: "Failed to lock seats"
    });
  }
};
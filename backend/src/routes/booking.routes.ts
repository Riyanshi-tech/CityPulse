import { Router } from "express";
import { lockSeatsController } from "../controllers/booking.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post(
  "/events/:eventId/lock-seats",
  authMiddleware,
  lockSeatsController
);

export default router;
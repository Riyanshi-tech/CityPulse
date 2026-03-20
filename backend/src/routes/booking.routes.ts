import { Router } from "express";
import { createBookingController, createPaymentController , confirmBookingController} from "../controllers/booking.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post(
  "/events/:eventId/book",
  authMiddleware,
  createBookingController
);
// 🔥 create payment
router.post(
  "/payments/create",
  authMiddleware,
  createPaymentController
);

// 🔥 confirm payment
router.post(
  "/payments/confirm",
  authMiddleware,
  confirmBookingController
);

export default router;
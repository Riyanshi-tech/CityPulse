import express from "express";
import { scanTicketController, getTicketsByBookingIdController, getMyTickets } from "../controllers/ticket.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/scan", scanTicketController);
router.get("/my", authMiddleware, getMyTickets);
router.get("/:bookingId", getTicketsByBookingIdController);
export default router;
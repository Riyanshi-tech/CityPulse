import { Router } from "express";
import {
  createEventController,
  getAllEventsController,
  getEventByIdController,
  updateEventController,
  deleteEventController
} from "../controllers/event.controller";

import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";

const router = Router();


router.get("/events", getAllEventsController);

router.get("/events/:id", getEventByIdController);


router.post(
  "/events",
  authMiddleware,
  roleMiddleware(["ORGANIZER"]),
  createEventController
);


router.patch(
  "/events/:id",
  authMiddleware,
  roleMiddleware(["ORGANIZER"]),
  updateEventController
);


router.delete(
  "/events/:id",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  deleteEventController
);


export default router;
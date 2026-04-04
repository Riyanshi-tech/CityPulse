"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const event_controller_1 = require("../controllers/event.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const role_middleware_1 = require("../middlewares/role.middleware");
const seatLock_controller_1 = require("../controllers/seatLock.controller");
const router = (0, express_1.Router)();
router.get("/events", event_controller_1.getAllEventsController);
router.get("/events/organizer", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(["ORGANIZER", "ADMIN"]), event_controller_1.getOrganizerEventsController);
router.get("/events/:id", event_controller_1.getEventByIdController);
router.get("/events/:id/seats", event_controller_1.getEventSeatsController);
router.post("/events", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(["ORGANIZER", "ADMIN"]), event_controller_1.createEventController);
router.patch("/events/:id", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(["ORGANIZER", "ADMIN"]), event_controller_1.updateEventController);
router.delete("/events/:id", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(["ADMIN", "ORGANIZER"]), event_controller_1.deleteEventController);
router.post("/events/:eventId/lock-seats", auth_middleware_1.authMiddleware, seatLock_controller_1.lockSeatsController);
exports.default = router;
//# sourceMappingURL=event.routes.js.map
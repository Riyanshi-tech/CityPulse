"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const booking_controller_1 = require("../controllers/booking.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.post("/events/:eventId/book", auth_middleware_1.authMiddleware, booking_controller_1.createBookingController);
router.post("/payments/create", auth_middleware_1.authMiddleware, booking_controller_1.createPaymentController);
router.post("/payments/confirm", auth_middleware_1.authMiddleware, booking_controller_1.confirmBookingController);
exports.default = router;
//# sourceMappingURL=booking.routes.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const seat_controller_1 = require("../controllers/seat.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const role_middleware_1 = require("../middlewares/role.middleware");
const router = (0, express_1.Router)();
router.post("/venues/:venueId/seats", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(["ADMIN", "ORGANIZER"]), seat_controller_1.createVenueSeatsController);
exports.default = router;
//# sourceMappingURL=seat.routes.js.map
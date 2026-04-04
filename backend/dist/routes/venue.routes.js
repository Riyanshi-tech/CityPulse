"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const venue_controller_1 = require("../controllers/venue.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const role_middleware_1 = require("../middlewares/role.middleware");
const router = (0, express_1.Router)();
router.get("/venues", venue_controller_1.getAllVenuesController);
router.post("/venues", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(["ADMIN", "ORGANIZER"]), venue_controller_1.createVenueController);
router.patch("/venues/:id", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(["ADMIN", "ORGANIZER"]), venue_controller_1.updateVenueController);
router.delete("/venues/:id", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(["ADMIN", "ORGANIZER"]), venue_controller_1.deleteVenueController);
exports.default = router;
//# sourceMappingURL=venue.routes.js.map
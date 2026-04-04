"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ticket_controller_1 = require("../controllers/ticket.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
router.post("/scan", ticket_controller_1.scanTicketController);
router.get("/my", auth_middleware_1.authMiddleware, ticket_controller_1.getMyTickets);
router.get("/:bookingId", ticket_controller_1.getTicketsByBookingIdController);
exports.default = router;
//# sourceMappingURL=ticket.routes.js.map
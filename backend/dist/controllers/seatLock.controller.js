"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lockSeatsController = void 0;
const seatLock_service_1 = require("../services/seatLock.service");
const lockSeatsController = async (req, res) => {
    try {
        const eventId = Number(req.params.eventId);
        const { seatIds } = req.body;
        const userId = req.user.id;
        if (isNaN(eventId)) {
            return res.status(400).json({
                message: "Invalid eventId"
            });
        }
        if (!seatIds || !Array.isArray(seatIds) || seatIds.length === 0) {
            return res.status(400).json({
                message: "seatIds must be a non-empty array"
            });
        }
        const result = await (0, seatLock_service_1.lockSeats)(eventId, seatIds, userId);
        res.json(result);
    }
    catch (error) {
        if (error.message === "Seat already booked" ||
            error.message.includes("locked")) {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({
            message: "Failed to lock seats"
        });
    }
};
exports.lockSeatsController = lockSeatsController;
//# sourceMappingURL=seatLock.controller.js.map
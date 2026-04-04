"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVenueSeatsController = void 0;
const seat_service_1 = require("../services/seat.service");
const client_1 = require("@prisma/client");
const createVenueSeatsController = async (req, res) => {
    try {
        const venueId = Number(req.params.venueId);
        const { vip, regular, balcony } = req.body;
        const result = await (0, seat_service_1.createVenueSeats)(venueId, client_1.SeatType.VIP || client_1.SeatType.REGULAR || client_1.SeatType.BALCONY, vip || regular || balcony);
        res.json({
            message: "Seats created successfully",
            result
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to create seats"
        });
    }
};
exports.createVenueSeatsController = createVenueSeatsController;
//# sourceMappingURL=seat.controller.js.map
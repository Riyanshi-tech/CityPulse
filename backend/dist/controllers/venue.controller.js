"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVenueController = exports.updateVenueController = exports.getAllVenuesController = exports.createVenueController = void 0;
const venue_service_1 = require("../services/venue.service");
const createVenueController = async (req, res) => {
    try {
        const venue = await (0, venue_service_1.createVenueService)(req.body);
        res.status(201).json(venue);
    }
    catch (error) {
        console.error("Error creating venue:", error);
        res.status(500).json({ message: "Failed to create venue" });
    }
};
exports.createVenueController = createVenueController;
const getAllVenuesController = async (req, res) => {
    try {
        const venues = await (0, venue_service_1.getAllVenuesService)();
        res.json(venues);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch venues" });
    }
};
exports.getAllVenuesController = getAllVenuesController;
const updateVenueController = async (req, res) => {
    try {
        const venue = await (0, venue_service_1.updateVenueService)(Number(req.params.id), req.body);
        res.json(venue);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to update venue" });
    }
};
exports.updateVenueController = updateVenueController;
const deleteVenueController = async (req, res) => {
    try {
        await (0, venue_service_1.deleteVenueService)(Number(req.params.id));
        res.json({ message: "Venue deleted" });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to delete venue" });
    }
};
exports.deleteVenueController = deleteVenueController;
//# sourceMappingURL=venue.controller.js.map
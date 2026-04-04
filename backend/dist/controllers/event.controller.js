"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEventSeatsController = exports.deleteEventController = exports.updateEventController = exports.getEventByIdController = exports.getOrganizerEventsController = exports.getAllEventsController = exports.createEventController = void 0;
const event_service_1 = require("../services/event.service");
const createEventController = async (req, res) => {
    try {
        const organizerId = req.user.id;
        const event = await (0, event_service_1.createEventService)(req.body, organizerId);
        res.status(201).json(event);
    }
    catch (error) {
        console.error("Error creating event:", error);
        res.status(500).json({
            message: "Failed to create event"
        });
    }
};
exports.createEventController = createEventController;
const getAllEventsController = async (req, res) => {
    try {
        const events = await (0, event_service_1.getAllEventsService)();
        res.json(events);
    }
    catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({
            message: "Failed to fetch events"
        });
    }
};
exports.getAllEventsController = getAllEventsController;
const getOrganizerEventsController = async (req, res) => {
    try {
        const organizerId = req.user.id;
        const events = await (0, event_service_1.getEventsByOrganizerService)(organizerId);
        res.json(events);
    }
    catch (error) {
        console.error("Error fetching organizer events:", error);
        res.status(500).json({
            message: "Failed to fetch your events"
        });
    }
};
exports.getOrganizerEventsController = getOrganizerEventsController;
const getEventByIdController = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const event = await (0, event_service_1.getEventByIdService)(id);
        res.json(event);
    }
    catch (error) {
        res.status(500).json({
            message: "Event not found"
        });
    }
};
exports.getEventByIdController = getEventByIdController;
const updateEventController = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const event = await (0, event_service_1.updateEventService)(id, req.body);
        res.json(event);
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to update event"
        });
    }
};
exports.updateEventController = updateEventController;
const deleteEventController = async (req, res) => {
    try {
        const id = Number(req.params.id);
        await (0, event_service_1.deleteEventService)(id);
        res.json({
            message: "Event deleted"
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to delete event"
        });
    }
};
exports.deleteEventController = deleteEventController;
const getEventSeatsController = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const seats = await (0, event_service_1.getEventSeatsService)(id);
        res.json(seats);
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to fetch event seats"
        });
    }
};
exports.getEventSeatsController = getEventSeatsController;
//# sourceMappingURL=event.controller.js.map
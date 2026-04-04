"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEventSeatsService = exports.deleteEventService = exports.updateEventService = exports.getEventByIdService = exports.getEventsByOrganizerService = exports.getAllEventsService = exports.createEventService = void 0;
const prisma_1 = require("../lib/prisma");
const eventSeat_service_1 = require("./eventSeat.service");
const createEventService = async (data, organizerId) => {
    const event = await prisma_1.prisma.events.create({
        data: {
            title: data.title,
            description: data.description,
            category: data.category,
            startDateTime: new Date(data.startDateTime),
            endDateTime: new Date(data.endDateTime),
            city: data.city,
            address: data.address,
            totalTickets: data.totalTickets,
            organizerId: organizerId,
            venueId: data.venueId
        }
    });
    await (0, eventSeat_service_1.createEventSeats)(event.id, data.venueId);
    return event;
};
exports.createEventService = createEventService;
const getAllEventsService = async () => {
    return await prisma_1.prisma.events.findMany({
        include: {
            venue: true,
            organizer: true,
        },
    });
};
exports.getAllEventsService = getAllEventsService;
const getEventsByOrganizerService = async (organizerId) => {
    return await prisma_1.prisma.events.findMany({
        where: { organizerId },
        include: {
            venue: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};
exports.getEventsByOrganizerService = getEventsByOrganizerService;
const getEventByIdService = async (id) => {
    return await prisma_1.prisma.events.findUnique({
        where: { id },
        include: {
            venue: true,
            organizer: true,
            eventSeats: true,
        },
    });
};
exports.getEventByIdService = getEventByIdService;
const updateEventService = async (id, data) => {
    return await prisma_1.prisma.events.update({
        where: { id },
        data: {
            title: data.title,
            description: data.description,
            category: data.category,
            startDateTime: data.startDateTime
                ? new Date(data.startDateTime)
                : undefined,
            endDateTime: data.endDateTime
                ? new Date(data.endDateTime)
                : undefined,
            venueId: data.venueId,
        },
    });
};
exports.updateEventService = updateEventService;
const deleteEventService = async (id) => {
    return await prisma_1.prisma.events.delete({
        where: { id },
    });
};
exports.deleteEventService = deleteEventService;
const getEventSeatsService = async (id) => {
    const event = await prisma_1.prisma.events.findUnique({
        where: { id },
        select: {
            eventSeats: true,
        },
    });
    return event?.eventSeats || [];
};
exports.getEventSeatsService = getEventSeatsService;
//# sourceMappingURL=event.service.js.map
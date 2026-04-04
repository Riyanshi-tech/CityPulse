"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVenueService = exports.updateVenueService = exports.getAllVenuesService = exports.createVenueService = void 0;
const prisma_1 = require("../lib/prisma");
const createVenueService = async (data) => {
    return await prisma_1.prisma.venue.create({
        data: {
            name: data.name,
            city: data.city,
            address: data.address,
            type: data.type,
            capacity: data.capacity
        }
    });
};
exports.createVenueService = createVenueService;
const getAllVenuesService = async () => {
    return await prisma_1.prisma.venue.findMany();
};
exports.getAllVenuesService = getAllVenuesService;
const updateVenueService = async (id, data) => {
    return await prisma_1.prisma.venue.update({
        where: { id },
        data
    });
};
exports.updateVenueService = updateVenueService;
const deleteVenueService = async (id) => {
    return await prisma_1.prisma.venue.delete({
        where: { id }
    });
};
exports.deleteVenueService = deleteVenueService;
//# sourceMappingURL=venue.service.js.map
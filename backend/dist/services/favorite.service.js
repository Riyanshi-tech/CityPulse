"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserFavorites = exports.removeFavorite = exports.addFavorite = void 0;
const prisma_1 = require("../lib/prisma");
const addFavorite = async (userId, eventId) => {
    const existing = await prisma_1.prisma.favorite.findUnique({
        where: {
            userId_eventId: {
                userId,
                eventId
            }
        }
    });
    if (existing) {
        throw new Error("Event is already favorited");
    }
    return await prisma_1.prisma.favorite.create({
        data: {
            userId,
            eventId
        }
    });
};
exports.addFavorite = addFavorite;
const removeFavorite = async (userId, eventId) => {
    const existing = await prisma_1.prisma.favorite.findUnique({
        where: {
            userId_eventId: {
                userId,
                eventId
            }
        }
    });
    if (!existing) {
        throw new Error("Event is not favorited");
    }
    return await prisma_1.prisma.favorite.delete({
        where: {
            userId_eventId: {
                userId,
                eventId
            }
        }
    });
};
exports.removeFavorite = removeFavorite;
const getUserFavorites = async (userId) => {
    const favorites = await prisma_1.prisma.favorite.findMany({
        where: { userId },
        include: {
            event: true
        }
    });
    return favorites;
};
exports.getUserFavorites = getUserFavorites;
//# sourceMappingURL=favorite.service.js.map
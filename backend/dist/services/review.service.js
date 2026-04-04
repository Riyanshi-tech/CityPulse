"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReview = exports.getEventReviews = exports.updateReview = exports.addReview = void 0;
const prisma_1 = require("../lib/prisma");
const addReview = async (userId, eventId, rating, comment) => {
    const ticket = await prisma_1.prisma.ticket.findFirst({
        where: {
            userId,
            eventId
        }
    });
    if (!ticket) {
        throw new Error("User has not attended this event");
    }
    const existing = await prisma_1.prisma.review.findUnique({
        where: {
            userId_eventId: {
                userId,
                eventId
            }
        }
    });
    if (existing) {
        throw new Error("You already reviewed this event");
    }
    return await prisma_1.prisma.review.create({
        data: {
            userId,
            eventId,
            rating,
            comment
        }
    });
};
exports.addReview = addReview;
const updateReview = async (userId, eventId, rating, comment) => {
    const existing = await prisma_1.prisma.review.findUnique({
        where: {
            userId_eventId: {
                userId,
                eventId
            }
        }
    });
    if (!existing) {
        throw new Error("Review not found");
    }
    return await prisma_1.prisma.review.update({
        where: {
            userId_eventId: {
                userId,
                eventId
            }
        },
        data: {
            rating,
            comment
        }
    });
};
exports.updateReview = updateReview;
const getEventReviews = async (eventId) => {
    return await prisma_1.prisma.review.findMany({
        where: { eventId },
        include: {
            user: {
                select: {
                    id: true,
                    username: true
                }
            }
        }
    });
};
exports.getEventReviews = getEventReviews;
const deleteReview = async (userId, eventId) => {
    const existing = await prisma_1.prisma.review.findUnique({
        where: {
            userId_eventId: {
                userId,
                eventId
            }
        }
    });
    if (!existing) {
        throw new Error("Review not found");
    }
    return await prisma_1.prisma.review.delete({
        where: {
            userId_eventId: {
                userId,
                eventId
            }
        }
    });
};
exports.deleteReview = deleteReview;
//# sourceMappingURL=review.service.js.map
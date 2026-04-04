"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReviewController = exports.getEventReviewsController = exports.updateReviewController = exports.addReviewController = void 0;
const review_service_1 = require("../services/review.service");
const addReviewController = async (req, res) => {
    try {
        const userId = req.user.id;
        const { eventId, rating, comment } = req.body;
        if (!eventId || !rating) {
            return res.status(400).json({
                message: "eventId and rating required"
            });
        }
        const review = await (0, review_service_1.addReview)(userId, eventId, rating, comment);
        res.json({
            message: "Review added",
            review
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.addReviewController = addReviewController;
const updateReviewController = async (req, res) => {
    try {
        const userId = req.user.id;
        const { eventId, rating, comment } = req.body;
        const review = await (0, review_service_1.updateReview)(userId, eventId, rating, comment);
        res.json({
            message: "Review updated",
            review
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.updateReviewController = updateReviewController;
const getEventReviewsController = async (req, res) => {
    try {
        const eventId = Number(req.params.eventId);
        const reviews = await (0, review_service_1.getEventReviews)(eventId);
        res.json(reviews);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.getEventReviewsController = getEventReviewsController;
const deleteReviewController = async (req, res) => {
    try {
        const userId = req.user.id;
        const eventId = Number(req.params.eventId);
        await (0, review_service_1.deleteReview)(userId, eventId);
        res.json({
            message: "Review deleted"
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.deleteReviewController = deleteReviewController;
//# sourceMappingURL=review.controller.js.map
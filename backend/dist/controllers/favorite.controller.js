"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserFavoritesController = exports.removeFromFavoritesController = exports.addToFavoritesController = void 0;
const favorite_service_1 = require("../services/favorite.service");
const addToFavoritesController = async (req, res) => {
    try {
        const userId = req.user.id;
        const eventId = Number(req.params.eventId);
        const favorite = await (0, favorite_service_1.addFavorite)(userId, eventId);
        res.json({
            message: "Event added to favorites",
            favorite
        });
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};
exports.addToFavoritesController = addToFavoritesController;
const removeFromFavoritesController = async (req, res) => {
    try {
        const userId = req.user.id;
        const eventId = Number(req.params.eventId);
        const favorite = await (0, favorite_service_1.removeFavorite)(userId, eventId);
        res.json({
            message: "Event removed from favorites",
            favorite
        });
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};
exports.removeFromFavoritesController = removeFromFavoritesController;
const getUserFavoritesController = async (req, res) => {
    try {
        const userId = req.user.id;
        const favorites = await (0, favorite_service_1.getUserFavorites)(userId);
        res.json({
            message: "User's favorite events",
            favorites
        });
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};
exports.getUserFavoritesController = getUserFavoritesController;
//# sourceMappingURL=favorite.controller.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const favorite_controller_1 = require("../controllers/favorite.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
router.post("/events/:eventId/favorites", auth_middleware_1.authMiddleware, favorite_controller_1.addToFavoritesController);
router.delete("/events/:eventId/favorites", auth_middleware_1.authMiddleware, favorite_controller_1.removeFromFavoritesController);
router.get("/favorites", auth_middleware_1.authMiddleware, favorite_controller_1.getUserFavoritesController);
exports.default = router;
//# sourceMappingURL=favorite.routes.js.map
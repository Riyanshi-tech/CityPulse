"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const review_controller_1 = require("../controllers/review.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
router.post("/", auth_middleware_1.authMiddleware, review_controller_1.addReviewController);
router.put("/", auth_middleware_1.authMiddleware, review_controller_1.updateReviewController);
router.get("/:eventId", review_controller_1.getEventReviewsController);
router.delete("/:eventId", auth_middleware_1.authMiddleware, review_controller_1.deleteReviewController);
exports.default = router;
//# sourceMappingURL=review.routes.js.map
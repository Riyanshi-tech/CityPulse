"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const role_middleware_1 = require("../middlewares/role.middleware");
const router = (0, express_1.Router)();
router.post("/login", auth_controller_1.loginController);
router.post("/refresh", auth_controller_1.refreshController);
router.patch("/update-profile", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(["USER", "ORGANIZER", "ADMIN"]), auth_controller_1.updateProfileController);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map
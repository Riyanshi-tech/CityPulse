"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleMiddleware = void 0;
const roleMiddleware = (allowedRoles) => {
    return (req, res, next) => {
        try {
            const user = req.user;
            if (!user) {
                return res.status(401).json({
                    message: "Unauthorized"
                });
            }
            if (!allowedRoles.includes(user.role)) {
                return res.status(403).json({
                    message: "Forbidden: insufficient permissions"
                });
            }
            next();
        }
        catch (error) {
            return res.status(500).json({
                message: "Server error"
            });
        }
    };
};
exports.roleMiddleware = roleMiddleware;
//# sourceMappingURL=role.middleware.js.map
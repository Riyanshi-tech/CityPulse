"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET;
const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({
                message: "Authorization header missing"
            });
        }
        const [scheme, token] = authHeader.split(/\s+/);
        if (!scheme || scheme.toLowerCase() !== "bearer" || !token) {
            console.log("Invalid Auth Header Format:", authHeader);
            return res.status(401).json({
                message: "Invalid authorization format. Expected 'Bearer <token>'"
            });
        }
        const decoded = jsonwebtoken_1.default.verify(token, ACCESS_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=auth.middleware.js.map
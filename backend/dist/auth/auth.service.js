"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokens = exports.loginUser = void 0;
const prisma_1 = require("../lib/prisma");
const hash_1 = require("../utils/hash");
const jwt_1 = require("../utils/jwt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET;
const loginUser = async (emailOrUsername, password) => {
    const cleanIdentifier = emailOrUsername.trim();
    const cleanPassword = password.trim();
    console.log("LOGIN ATTEMPT - Identifier:", cleanIdentifier, "Length:", cleanIdentifier.length);
    const user = await prisma_1.prisma.user.findFirst({
        where: {
            OR: [
                { email: cleanIdentifier },
                { username: cleanIdentifier }
            ]
        },
    });
    if (!user) {
        console.log("LOGIN FAILED - User not found in DB");
        throw new Error("Invalid credentials");
    }
    console.log("LOGIN - User found:", user.username, "Hashed Pass Length:", user.password?.length);
    const isValid = await (0, hash_1.comparepassword)(cleanPassword, user.password);
    console.log("LOGIN - Password match result:", isValid, "Input Pass Length:", cleanPassword.length);
    if (!isValid) {
        throw new Error("Invalid credentials");
    }
    const payload = {
        id: user.id,
        email: user.email,
        role: user.role,
    };
    const accessToken = (0, jwt_1.generateAccessToken)(payload);
    const refreshToken = (0, jwt_1.generateRefreshToken)(payload);
    await prisma_1.prisma.refreshToken.create({
        data: {
            token: refreshToken,
            userId: user.id,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
    });
    return {
        accessToken,
        refreshToken,
        user: { id: user.id, email: user.email, username: user.username, role: user.role },
    };
};
exports.loginUser = loginUser;
const refreshTokens = async (token) => {
    const payload = jsonwebtoken_1.default.verify(token, REFRESH_SECRET);
    console.log('====================================');
    console.log(payload, "PAYLOAD");
    console.log('====================================');
    const storedToken = await prisma_1.prisma.refreshToken.findUnique({
        where: { token }
    });
    if (!storedToken) {
        throw new Error("Invalid refresh token");
    }
    const user = await prisma_1.prisma.user.findUnique({
        where: { id: payload.id }
    });
    if (!user) {
        throw new Error("User not found");
    }
    await prisma_1.prisma.refreshToken.delete({
        where: { token }
    });
    const newPayload = {
        id: user.id,
        email: user.email,
        role: user.role
    };
    const accessToken = (0, jwt_1.generateAccessToken)(newPayload);
    const refreshToken = (0, jwt_1.generateRefreshToken)(newPayload);
    await prisma_1.prisma.refreshToken.create({
        data: {
            token: refreshToken,
            userId: user.id,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        }
    });
    return { accessToken, refreshToken };
};
exports.refreshTokens = refreshTokens;
//# sourceMappingURL=auth.service.js.map
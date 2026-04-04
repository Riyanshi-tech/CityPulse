"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfileController = exports.refreshController = exports.loginController = void 0;
const auth_service_1 = require("./auth.service");
const auth_service_2 = require("./auth.service");
const prisma_1 = require("../lib/prisma");
const loginController = async (req, res, next) => {
    try {
        const { emailOrUsername, email, username, password } = req.body;
        const identifier = emailOrUsername || email || username;
        const { accessToken, refreshToken, user } = await (0, auth_service_1.loginUser)(identifier, password);
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
        });
        res.json({ accessToken, user });
    }
    catch (error) {
        next(error);
    }
};
exports.loginController = loginController;
const refreshController = async (req, res) => {
    const token = req.cookies.refreshToken;
    if (!token) {
        return res.status(401).json({ message: "No refresh token" });
    }
    const { accessToken, refreshToken } = await (0, auth_service_2.refreshTokens)(token);
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "strict"
    });
    res.json({ accessToken });
};
exports.refreshController = refreshController;
const updateProfileController = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const { email, username } = req.body;
    const userId = Number(req.user.id);
    await prisma_1.prisma.user.update({
        where: { id: userId },
        data: { email, username },
    });
    res.json({ message: "Profile updated successfully" });
};
exports.updateProfileController = updateProfileController;
//# sourceMappingURL=auth.controller.js.map
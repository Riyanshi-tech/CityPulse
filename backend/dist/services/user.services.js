"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getAllUsers = void 0;
const prisma_1 = require("../lib/prisma");
const getAllUsers = async () => {
    return await prisma_1.prisma.user.findMany();
};
exports.getAllUsers = getAllUsers;
const createUser = async (data) => {
    console.log("PRISMA CREATE DATA:", JSON.stringify(data, null, 2));
    return await prisma_1.prisma.user.create({ data });
};
exports.createUser = createUser;
//# sourceMappingURL=user.services.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.creatUserController = exports.getUsers = void 0;
const user_services_1 = require("../services/user.services");
const user_validation_1 = require("../validations/user.validation");
const hash_1 = require("../utils/hash");
const getUsers = async (req, res) => {
    try {
        const users = await (0, user_services_1.getAllUsers)();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
};
exports.getUsers = getUsers;
const creatUserController = async (req, res, next) => {
    try {
        const validatedData = user_validation_1.createUserSchema.parse(req.body);
        const { username, email, password, firstName, lastName, role } = validatedData;
        const trimmedPassword = password.trim();
        const hashedpassword = await (0, hash_1.hashpassword)(trimmedPassword);
        const user = await (0, user_services_1.createUser)({
            username: username.trim(),
            email: email.trim(),
            password: hashedpassword,
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            role
        });
        console.log("User created successfully:", user);
        return res.status(201).json(user);
    }
    catch (error) {
        next(error);
    }
};
exports.creatUserController = creatUserController;
//# sourceMappingURL=user.controller.js.map
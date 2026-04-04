"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparepassword = exports.hashpassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const hashpassword = async (password) => {
    const salt = await bcrypt_1.default.genSalt(10);
    const hashedPassword = await bcrypt_1.default.hash(password, salt);
    return hashedPassword;
};
exports.hashpassword = hashpassword;
const comparepassword = async (password, hashedpassword) => {
    const isMatch = await bcrypt_1.default.compare(password, hashedpassword);
    return isMatch;
};
exports.comparepassword = comparepassword;
//# sourceMappingURL=hash.js.map
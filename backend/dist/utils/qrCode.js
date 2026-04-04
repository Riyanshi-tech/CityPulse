"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateQRCode = void 0;
const qrcode_1 = __importDefault(require("qrcode"));
const generateQRCode = async (data) => {
    return await qrcode_1.default.toDataURL(data);
};
exports.generateQRCode = generateQRCode;
//# sourceMappingURL=qrCode.js.map
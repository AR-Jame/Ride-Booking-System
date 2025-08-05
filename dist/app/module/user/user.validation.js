"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const user_interface_1 = require("./user.interface");
exports.createUserSchema = zod_1.default.object({
    name: zod_1.default
        .string({ message: "Name is required" })
        .min(1, { message: "Name cannot be empty" }),
    email: zod_1.default
        .email({ message: "Please enter a valid email address" }),
    password: zod_1.default
        .string({ message: "Password is required" })
        .min(6, { message: "Password must be at least 6 characters" }),
    phone: zod_1.default
        .string({ message: "Phone must be a string" })
        .optional(),
    role: zod_1.default
        .enum(Object.values(user_interface_1.Role))
        .optional(),
    address: zod_1.default
        .string({ message: "Address must be a string" })
        .optional(),
    isActive: zod_1.default
        .enum(Object.values(user_interface_1.isActive))
        .optional(),
    isDeleted: zod_1.default
        .boolean({ message: "isDeleted flag is required", })
        .optional(),
    isVerified: zod_1.default
        .boolean({ message: "isVerified must be a boolean" })
        .optional(),
    picture: zod_1.default
        .url({ message: "Picture must be a valid URL" })
        .optional(),
});

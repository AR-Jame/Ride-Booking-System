import z from "zod";
import { isActive, Role } from "./user.interface";


export const createUserSchema = z.object({
    name: z
        .string({ message: "Name is required" })
        .min(1, { message: "Name cannot be empty" }),

    email: z
        .email({ message: "Please enter a valid email address" }),

    password: z
        .string({ message: "Password is required" })
        .min(6, { message: "Password must be at least 6 characters" }),

    phone: z
        .string({ message: "Phone must be a string" })
        .optional(),

    role: z
        .enum(Object.values(Role))
        .optional(),

    address: z
        .string({ message: "Address must be a string" })
        .optional(),

    isActive: z
        .enum(Object.values(isActive))
        .optional(),

    isDeleted: z
        .boolean({ message: "isDeleted flag is required", })
        .optional(),

    isVerified: z
        .boolean({ message: "isVerified must be a boolean" })
        .optional(),

    picture: z
        .url({ message: "Picture must be a valid URL" })
        .optional(),
});
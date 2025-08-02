import z from "zod";
import { IDriverStatus } from "./driver.interface";

const ObjectIdSchema = z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId format");

export const createVehicleSchema = z.object({
    vehicleBrand: z
        .string()
        .min(1, "vehicle Brand is required"),
    vehicleModel: z
        .string()
        .min(2, "Plate number is required"),
    vehicleLicense: z
        .string()
        .min(5, "Vehicle License is required"),
});

export const createDriverSchema = z.object({
    _id: ObjectIdSchema.optional(),
    user: ObjectIdSchema,
    availability: z.boolean({ error: "Availability must be boolean" }),
    drivingLicense: z
        .string()
        .min(5, "Driving license must have at least 5 characters"),
    status: z
        .enum(Object.keys(IDriverStatus))
        .optional(),
    rating: z
        .number()
        .min(0, "Rating cannot be negative")
        .max(5, "Rating cannot exceed 5")
        .nullable()
        .optional(),
    ratingCount: z
        .number()
        .min(0, "Rating cannot be negative")
        .optional(),
    vehicle: createVehicleSchema,
});
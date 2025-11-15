"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDriverSchema = exports.createVehicleSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const driver_interface_1 = require("./driver.interface");
exports.createVehicleSchema = zod_1.default.object({
    vehicleBrand: zod_1.default
        .string()
        .min(1, "vehicle Brand is required"),
    vehicleModel: zod_1.default
        .string()
        .min(2, "vehicleModel is required"),
    vehicleLicense: zod_1.default
        .string()
        .min(5, "Vehicle License is required"),
});
exports.createDriverSchema = zod_1.default.object({
    _id: zod_1.default.string().optional(),
    availability: zod_1.default.boolean({ error: "Availability must be boolean" }),
    drivingLicense: zod_1.default
        .string()
        .min(5, "Driving license must have at least 5 characters"),
    status: zod_1.default
        .enum(Object.keys(driver_interface_1.IDriverStatus))
        .optional(),
    rating: zod_1.default
        .number()
        .min(0, "Rating cannot be negative")
        .max(5, "Rating cannot exceed 5")
        .nullable()
        .optional(),
    ratingCount: zod_1.default
        .number()
        .min(0, "Rating cannot be negative")
        .optional(),
    vehicle: exports.createVehicleSchema,
    // currentLocation: z.array(z.number()).optional().nullable()
});

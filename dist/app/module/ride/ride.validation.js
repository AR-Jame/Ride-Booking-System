"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRideSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const ride_interface_1 = require("./ride.interface");
const zodRideStatus = zod_1.default.object({
    status: zod_1.default
        .enum(Object.keys(ride_interface_1.IRideStatusEnum), { error: "Status must be a string" }),
    at: zod_1.default
        .date({ error: "Enter a valid date." })
});
exports.createRideSchema = zod_1.default.object({
    driver: zod_1.default
        .string({ error: "Driver Id is required" })
        .length(24, { error: "Provide a valid objectId" })
        .nullable()
        .optional(),
    rider: zod_1.default
        .string({ error: "Rider Id is required" })
        .length(24, { error: "Provide a valid objectId" }),
    status: [zodRideStatus],
    fare: zod_1.default
        .number({ error: "fare must be a number." })
        .optional(),
    distance: zod_1.default
        .number({ error: "Distance must be a number" })
        .optional(),
    canceledBy: zod_1.default
        .string({ error: "Id is required" })
        .length(24, { error: "Provide a valid objectId" })
        .nullable()
        .optional(),
    arrival: zod_1.default.array(zod_1.default.number()),
    destination: zod_1.default.array(zod_1.default.number()),
});

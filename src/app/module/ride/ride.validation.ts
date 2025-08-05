import z from "zod";
import { IRideStatusEnum } from "./ride.interface";


const zodRideStatus = z.object({
    status: z
        .enum(Object.keys(IRideStatusEnum), { error: "Status must be a string" })
        .optional(),
    at: z
        .date({ error: "Enter a valid date." })
        .optional()

})

export const createRideSchema = z.object({
    driver: z
        .string({ error: "Driver Id is required" })
        .length(24, { error: "Provide a valid objectId" })
        .nullable()
        .optional(),
    rider: z
        .string({ error: "Rider Id is required" })
        .length(24, { error: "Provide a valid objectId" })
        .optional(),
    status: z.array(zodRideStatus).optional(),
    fare: z
        .number({ error: "fare must be a number." })
        .optional(),
    distance: z
        .number({ error: "Distance must be a number" })
        .optional(),
    canceledBy: z
        .string({ error: "Id is required" })
        .length(24, { error: "Provide a valid objectId" })
        .nullable()
        .optional(),
    arrival: z.array(z.number()),
    destination: z.array(z.number()),
})
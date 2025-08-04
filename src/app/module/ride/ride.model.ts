/* eslint-disable @typescript-eslint/no-this-alias */
import { model, Schema } from "mongoose";
import { IRide, IRideStatus, IRideStatusEnum } from "./ride.interface";
import axios from "axios";
import { env } from "../../config/env";


const rideStatusSchema = new Schema<IRideStatus>({
    status: {
        type: String,
        enum: Object.keys(IRideStatusEnum),
        default: IRideStatusEnum.REQUESTED
    },
    at: { type: Date, default: new Date() }
}, {
    versionKey: false,
    timestamps: false,
    _id: false
})

const rideSchema = new Schema<IRide>({
    driver: {
        type: Schema.Types.ObjectId,
        ref: "Driver",
        default: null,
    },
    rider: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    status: {
        type: [rideStatusSchema],
        default: [{ status: IRideStatusEnum.REQUESTED, at: new Date() }]
    },
    distance: { type: Number },
    fare: {
        type: Number
    },
    canceledBy: {
        type: Schema.Types.ObjectId,
        default: null
    },
    arrival: { type: [Number] },
    destination: { type: [Number] }
}, {
    versionKey: false,
    timestamps: true
})


rideSchema.pre('save', async function (next) {
    const body = this;
    const { arrival, destination } = body;

    const graphHP = await axios.post(
        'https://graphhopper.com/api/1/route',
        {
            profile: 'bike',
            points: [
                arrival,
                destination
            ],
            locale: 'en',
            calc_points: false
        },
        {
            params: {
                key: env.GRAPH_HOPPER_API_KEY
            },
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    const distance = graphHP.data.paths[0].distance / 1000;
    const fare = Math.ceil(distance * 30);
    this.fare = fare;
    this.distance = distance

    next();

})

export const Ride = model<IRide>('Ride', rideSchema)
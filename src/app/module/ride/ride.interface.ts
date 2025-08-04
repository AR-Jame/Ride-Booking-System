import { Types } from "mongoose";

export enum IRideStatusEnum {
    REQUESTED = "REQUESTED",
    ACCEPTED = "ACCEPTED",
    ARRIVING = "ARRIVING",
    PICKED_UP = "PICKED_UP",
    COMPLETED = "COMPLETED",
    CANCELED = "CANCELED",
}

export interface IRideStatus {
    status: IRideStatusEnum,
    at: Date
}

export interface IRide {
    _id?: Types.ObjectId;
    driver?: Types.ObjectId;
    rider?: Types.ObjectId;
    status: IRideStatus[];
    fare: number;
    distance: number;
    canceledBy: Types.ObjectId;
    arrival: number[];
    destination: number[];
}
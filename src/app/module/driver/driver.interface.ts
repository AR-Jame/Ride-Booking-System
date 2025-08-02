import { Types } from "mongoose";

export interface IVehicle {
    vehicleBrand: string;
    vehicleModel: string;
    vehicleLicense: string;
}

export interface ILocation {
    latitude: string;
    longitude: string;
};

export enum IDriverStatus {
    REQUESTED = "REQUESTED",
    APPROVED = "APPROVED",
    SUSPEND = "SUSPEND",
}

export interface IDriver {
    _id?: Types.ObjectId;
    user: Types.ObjectId;
    availability: boolean;
    drivingLicense: string;
    status?: IDriverStatus;
    rating?: number;
    ratingCount: number;
    vehicle: IVehicle;
    currentLocation?: ILocation
}
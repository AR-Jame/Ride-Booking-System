import { model, Schema } from "mongoose";
import { IDriver, IDriverStatus, IVehicle } from "./driver.interface";


const vehicleSchema = new Schema<IVehicle>({
    vehicleBrand: { type: String, required: true },
    vehicleModel: { type: String, required: true },
    vehicleLicense: { type: String, required: true, unique: true },
}, {
    versionKey: false,
    _id: false
})


const driverSchema = new Schema<IDriver>({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    availability: { type: Boolean, default: false },
    drivingLicense: {
        type: String,
        required: true,
        unique: true
    },
    rating: {
        type: Number
    },
    ratingCount: {
        type: Number,
        required: true,
        default: 0
    },
    status: {
        type: String,
        enum: Object.keys(IDriverStatus),
        default: IDriverStatus.REQUESTED
    },
    vehicle: vehicleSchema
}, {
    versionKey: false,
    timestamps: true
})

export const Driver = model<IDriver>("Driver", driverSchema);


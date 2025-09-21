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
    availability: { type: Boolean, default: true },
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
        default: 0
    },
    status: {
        type: String,
        enum: Object.keys(IDriverStatus),
        default: IDriverStatus.REQUESTED
    },
    vehicle: vehicleSchema,
    currentLocation: { type: [Number] },
}, {
    versionKey: false,
    timestamps: true
})


driverSchema.index({ currentLocation: '2dsphere' });

export const Driver = model<IDriver>("Driver", driverSchema);


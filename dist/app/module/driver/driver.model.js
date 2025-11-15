"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Driver = void 0;
const mongoose_1 = require("mongoose");
const driver_interface_1 = require("./driver.interface");
const vehicleSchema = new mongoose_1.Schema({
    vehicleBrand: { type: String, required: true },
    vehicleModel: { type: String, required: true },
    vehicleLicense: { type: String, required: true, unique: true },
}, {
    versionKey: false,
    _id: false
});
const driverSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
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
        enum: Object.keys(driver_interface_1.IDriverStatus),
        default: driver_interface_1.IDriverStatus.REQUESTED
    },
    vehicle: vehicleSchema,
    currentLocation: { type: [Number] },
}, {
    versionKey: false,
    timestamps: true
});
driverSchema.index({ currentLocation: '2dsphere' });
exports.Driver = (0, mongoose_1.model)("Driver", driverSchema);

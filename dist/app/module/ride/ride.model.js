"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ride = void 0;
/* eslint-disable @typescript-eslint/no-this-alias */
const mongoose_1 = require("mongoose");
const ride_interface_1 = require("./ride.interface");
const axios_1 = __importDefault(require("axios"));
const env_1 = require("../../config/env");
const rideStatusSchema = new mongoose_1.Schema({
    status: {
        type: String,
        enum: Object.keys(ride_interface_1.IRideStatusEnum),
        default: ride_interface_1.IRideStatusEnum.REQUESTED
    },
    at: { type: Date, default: new Date() }
}, {
    versionKey: false,
    timestamps: false,
    _id: false
});
const rideSchema = new mongoose_1.Schema({
    driver: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Driver",
        default: null,
    },
    rider: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    currentStatus: {
        type: String,
        enum: Object.keys(ride_interface_1.IRideStatusEnum),
        default: ride_interface_1.IRideStatusEnum.REQUESTED,
    },
    status: {
        type: [rideStatusSchema],
        default: [{ status: ride_interface_1.IRideStatusEnum.REQUESTED, at: new Date() }]
    },
    distance: { type: Number },
    fare: {
        type: Number
    },
    canceledBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        default: null
    },
    arrival: { type: [Number] },
    destination: { type: [Number] }
}, {
    versionKey: false,
    timestamps: true
});
rideSchema.index({ arrival: "2dsphere" });
rideSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = this;
        const { arrival, destination } = body;
        const graphHP = yield axios_1.default.post('https://graphhopper.com/api/1/route', {
            profile: 'bike',
            points: [
                arrival,
                destination
            ],
            locale: 'en',
            calc_points: false
        }, {
            params: {
                key: env_1.env.GRAPH_HOPPER_API_KEY
            },
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const distance = graphHP.data.paths[0].distance / 1000;
        const fare = Math.ceil(distance * 30);
        this.fare = fare;
        this.distance = distance;
        next();
    });
});
exports.Ride = (0, mongoose_1.model)('Ride', rideSchema);

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
exports.rideServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ride_interface_1 = require("./ride.interface");
const ride_model_1 = require("./ride.model");
const QueryBuilder_1 = require("../../utils/QueryBuilder");
const user_interface_1 = require("../user/user.interface");
const AppError_1 = __importDefault(require("../../errorHelper/AppError"));
const createRideRequest = (body, rider) => __awaiter(void 0, void 0, void 0, function* () {
    body.rider = rider;
    const data = yield ride_model_1.Ride.create(body);
    return data;
});
const acceptRide = (rideId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const activeRide = yield ride_model_1.Ride.findOne({
        driver: userId,
        currentStatus: { $nin: [ride_interface_1.IRideStatusEnum.CANCELED, ride_interface_1.IRideStatusEnum.COMPLETED] }
    });
    if (activeRide) {
        throw new Error("You are already in a ride.");
    }
    const ride = yield ride_model_1.Ride.findById(rideId);
    if (!ride) {
        throw new Error("Ride does not found");
    }
    if (ride.currentStatus !== ride_interface_1.IRideStatusEnum.REQUESTED) {
        throw new AppError_1.default(400, "Someone already accept this ride.");
    }
    const updatedRide = yield ride_model_1.Ride.findByIdAndUpdate(rideId, {
        $set: { driver: userId, currentStatus: ride_interface_1.IRideStatusEnum.ACCEPTED },
        $addToSet: { status: { status: ride_interface_1.IRideStatusEnum.ACCEPTED, at: new Date() } }
    }, { new: true });
    return updatedRide;
});
const getAllRides = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const queryBuilder = new QueryBuilder_1.QueryBuilder(ride_model_1.Ride.find(), query);
    const data = queryBuilder.filter().fieldFilter().sort().paginate().build();
    return data;
});
const rideHistory = (userPayload) => __awaiter(void 0, void 0, void 0, function* () {
    let rides;
    if (userPayload.role === user_interface_1.Role.DRIVER) {
        rides = yield ride_model_1.Ride.find({ driver: userPayload.id, "status.status": ride_interface_1.IRideStatusEnum.COMPLETED });
    }
    else if (userPayload.role === user_interface_1.Role.RIDER) {
        rides = yield ride_model_1.Ride.find({ rider: userPayload.id });
    }
    return rides;
});
const rideDetails = (rideId) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield ride_model_1.Ride.findById(rideId);
    return data;
});
const getCurrentRide = (decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
    let ride;
    if (decodedToken.role === user_interface_1.Role.DRIVER) {
        ride = yield ride_model_1.Ride.findOne({ driver: decodedToken.id });
    }
    else if (decodedToken.role === user_interface_1.Role.RIDER) {
        ride = yield ride_model_1.Ride.findOne({ rider: decodedToken.id });
    }
    return ride;
});
const getEarningHistory = (userId, time) => __awaiter(void 0, void 0, void 0, function* () {
    const driverId = new mongoose_1.default.Types.ObjectId(userId);
    let data;
    if (time === 'daily') {
        data = yield ride_model_1.Ride.aggregate([
            { $match: { driver: driverId } },
            {
                $group: {
                    _id: {
                        date: {
                            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
                        }
                    },
                    totalEarnings: { $sum: "$fare" }
                }
            },
            { $sort: { "_id.date": 1 } }
        ]);
    }
    else if (time === "monthly") {
        data = yield ride_model_1.Ride.aggregate([
            { $match: { driver: driverId } },
            {
                $group: {
                    _id: {
                        month: {
                            $dateToString: { format: "%Y-%m", date: "$createdAt" }
                        }
                    },
                    totalEarnings: { $sum: "$fare" }
                }
            },
            { $sort: { "_id.month": 1 } }
        ]);
    }
    return data;
});
const getNearByRides = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const lat = query.latitude;
    const lnt = query.longitude;
    const coords = [Number(lat), Number(lnt)];
    const data = yield ride_model_1.Ride.find({
        arrival: {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: coords
                },
                $maxDistance: 5000
            }
        },
        currentStatus: ride_interface_1.IRideStatusEnum.REQUESTED
    });
    return data;
});
const cancelRide = (rideId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const ride = yield ride_model_1.Ride.findById(rideId);
    if (!ride) {
        throw new Error("Ride does not exists.");
    }
    if (ride.currentStatus !== ride_interface_1.IRideStatusEnum.REQUESTED) {
        throw new AppError_1.default(400, "You can't cancel this ride in this stage.");
    }
    if (ride.driver !== userId && ride.rider !== userId) {
        throw new Error("You are not driver or rider for this ride. So, who are you!!!");
    }
    const updatedRide = yield ride_model_1.Ride.findByIdAndUpdate(rideId, {
        $set: { canceledBy: userId, currentStatus: ride_interface_1.IRideStatusEnum.CANCELED },
        $addToSet: { status: { status: ride_interface_1.IRideStatusEnum.CANCELED, at: new Date() } }
    }, { new: true });
    return updatedRide;
});
const updateRideStatus = (rideId, status) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedRide = yield ride_model_1.Ride.findByIdAndUpdate(rideId, {
        $set: { currentStatus: status },
        $push: { status: { status, at: new Date() } }
    }, { new: true });
    return updatedRide;
});
exports.rideServices = {
    createRideRequest,
    getAllRides,
    rideHistory,
    rideDetails,
    getEarningHistory,
    getCurrentRide,
    getNearByRides,
    acceptRide,
    cancelRide,
    updateRideStatus
};

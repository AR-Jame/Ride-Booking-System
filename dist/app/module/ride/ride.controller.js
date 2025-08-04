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
Object.defineProperty(exports, "__esModule", { value: true });
exports.rideControllers = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const ride_service_1 = require("./ride.service");
const sendResponse_1 = require("../../utils/sendResponse");
const createRideRequest = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const rider = req.user.id;
    const rideData = yield ride_service_1.rideServices.createRideRequest(body, rider);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        success: true,
        message: "Ride request created successfully",
        data: rideData
    });
}));
const getAllRides = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const rideData = yield ride_service_1.rideServices.getAllRides(query);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Ride retrieved successfully",
        data: rideData
    });
}));
const getCurrentRide = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const rideData = yield ride_service_1.rideServices.getCurrentRide(user);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Ride retrieved successfully",
        data: rideData
    });
}));
const rideHistory = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const rideData = yield ride_service_1.rideServices.rideHistory(user);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Rides retrieved successfully",
        data: rideData
    });
}));
const rideDetails = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const rideId = req.params.rideId;
    const rideData = yield ride_service_1.rideServices.rideDetails(rideId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Rides retrieved successfully",
        data: rideData
    });
}));
const getEarningHistory = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user.id;
    const time = req.query.time || "daily";
    const rideData = yield ride_service_1.rideServices.getEarningHistory(user, time);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Earning history retrieved successfully",
        data: rideData
    });
}));
const getNearByRides = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const rideData = yield ride_service_1.rideServices.getNearByRides(query);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Nearby rides retrieved successfully",
        data: rideData
    });
}));
const cancelRide = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const rideId = req.params.rideId;
    const user = req.user.id;
    const rideData = yield ride_service_1.rideServices.cancelRide(rideId, user);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Ride canceled successfully",
        data: rideData
    });
}));
const updateRideStatus = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const rideId = req.params.rideId;
    const status = req.body.status;
    const rideData = yield ride_service_1.rideServices.updateRideStatus(rideId, status);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Ride status updated successfully",
        data: rideData
    });
}));
const acceptRide = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const rideId = req.params.rideId;
    const userId = req.user.id;
    const rideData = yield ride_service_1.rideServices.acceptRide(rideId, userId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Your're successfully accepted for this ride.",
        data: rideData
    });
}));
exports.rideControllers = {
    createRideRequest,
    getAllRides,
    rideHistory,
    rideDetails,
    getEarningHistory,
    getNearByRides,
    getCurrentRide,
    acceptRide,
    cancelRide,
    updateRideStatus
};

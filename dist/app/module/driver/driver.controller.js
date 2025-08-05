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
exports.driverControllers = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const driver_services_1 = require("./driver.services");
const sendResponse_1 = require("../../utils/sendResponse");
const createDriver = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.user;
    const body = req.body;
    const driver = yield driver_services_1.driverServices.createDriver(body, payload);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        message: "Driver request created successfully.",
        success: true,
        data: driver
    });
}));
const getDriversWithUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const driver = yield driver_services_1.driverServices.getDriversWithUser(query);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        message: "Driver retrieved successfully.",
        success: true,
        data: driver
    });
}));
const getDriverProfile = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const driver = yield driver_services_1.driverServices.getDriverProfile(userId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        message: "Driver profile retrieved successfully.",
        success: true,
        data: driver
    });
}));
const getNearbyDrivers = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const coords = req.body.coords;
    const driver = yield driver_services_1.driverServices.getNearbyDrivers(coords);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        message: "Nearest driver retrieved successfully.",
        success: true,
        data: driver
    });
}));
const updateDriverStatus = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const status = req.body.acceptance;
    const response = yield driver_services_1.driverServices.updateDriverStatus(userId, status);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        message: "Driver status updated successfully.",
        success: true,
        data: response
    });
}));
const updateAvailability = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const availability = req.body.availability;
    const response = yield driver_services_1.driverServices.updateAvailability(userId, availability);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        message: "Your availability updated successfully.",
        success: true,
        data: response
    });
}));
const updateRating = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const driverId = req.params.driverId;
    const rating = req.body.rating;
    const response = yield driver_services_1.driverServices.updateRating(driverId, Number(rating));
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        message: "Rating updated successfully.",
        success: true,
        data: response
    });
}));
exports.driverControllers = {
    createDriver,
    getDriversWithUser,
    getDriverProfile,
    getNearbyDrivers,
    updateDriverStatus,
    updateAvailability,
    updateRating
};

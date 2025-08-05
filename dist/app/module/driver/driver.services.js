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
exports.driverServices = void 0;
const driver_interface_1 = require("./driver.interface");
const user_model_1 = require("../user/user.model");
const user_interface_1 = require("../user/user.interface");
const driver_model_1 = require("./driver.model");
const QueryBuilder_1 = require("../../utils/QueryBuilder");
const createDriver = (body, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield user_model_1.User.findOne({ email: payload.email });
    if (!isUserExist || isUserExist.isDeleted === true) {
        throw new Error("This user does not exist.");
    }
    if (isUserExist.isActive !== user_interface_1.isActive.ACTIVE) {
        throw new Error("This user does not active.");
    }
    body.status = driver_interface_1.IDriverStatus.REQUESTED;
    body.user = payload.id;
    const driver = yield driver_model_1.Driver.create(body);
    return driver;
});
const getDriversWithUser = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const queryBuilder = new QueryBuilder_1.QueryBuilder(driver_model_1.Driver.find(), query);
    const drivers = yield queryBuilder
        .filter()
        .sort()
        .fieldFilter()
        .population('user')
        .paginate()
        .build();
    return drivers;
});
const getDriverProfile = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield driver_model_1.Driver.findOne({ user: id }).populate("user");
    if (!data) {
        throw new Error("Driver does not exists.");
    }
    return data;
});
const getNearbyDrivers = (coords) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield driver_model_1.Driver.find({
        currentLocation: {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: coords
                },
                $maxDistance: 5000
            }
        }
    });
    return data;
});
const updateDriverStatus = (userId, status) => __awaiter(void 0, void 0, void 0, function* () {
    if (status === "yes") {
        const updatedUser = yield user_model_1.User.findByIdAndUpdate(userId, { role: user_interface_1.Role.DRIVER });
        if (!updatedUser) {
            throw new Error("User does not exists.");
        }
        yield driver_model_1.Driver.findOneAndUpdate({ user: userId }, { status: driver_interface_1.IDriverStatus.APPROVED });
        return true;
    }
    else if (status === "no") {
        yield driver_model_1.Driver.findOneAndUpdate({ user: userId }, { status: driver_interface_1.IDriverStatus.SUSPEND });
        return true;
    }
    else {
        throw new Error("Invalid request.");
    }
});
const updateAvailability = (userId, availability) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield driver_model_1.Driver.findOne({ user: userId });
    if (!isUserExist) {
        throw new Error("Driver does not found");
    }
    else if (isUserExist.status !== driver_interface_1.IDriverStatus.APPROVED) {
        throw new Error("We can't update your status right now.");
    }
    yield driver_model_1.Driver.updateOne({ _id: userId, }, { status: availability });
    return true;
});
const updateRating = (id, rating) => __awaiter(void 0, void 0, void 0, function* () {
    if (rating < 1 || rating > 5) {
        throw new Error("Rating must be between 1 to 5.");
    }
    const data = yield driver_model_1.Driver.findByIdAndUpdate(id, [
        {
            $set: {
                rating: { $add: [{ $ifNull: ["$rating", 0] }, rating] },
                ratingCount: { $add: [{ $ifNull: ["$ratingCount", 0] }, 1] },
            }
        }
    ], {
        new: true
    });
    return data;
});
exports.driverServices = {
    createDriver,
    getDriversWithUser,
    getDriverProfile,
    updateDriverStatus,
    updateAvailability,
    updateRating,
    getNearbyDrivers
};

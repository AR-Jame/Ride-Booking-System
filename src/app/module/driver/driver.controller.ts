/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { driverServices } from "./driver.services";
import { sendResponse } from "../../utils/sendResponse";

const createDriver = catchAsync(async (req: Request, res: Response) => {
    const payload = req.user;
    const body = req.body;
    const driver = await driverServices.createDriver(body, payload);

    sendResponse(res, {
        statusCode: 201,
        message: "Driver request created successfully.",
        success: true,
        data: driver
    })

})


const getDriversWithUser = catchAsync(async (req: Request, res: Response) => {
    const query = req.query;
    const driver = await driverServices.getDriversWithUser(query as any);

    sendResponse(res, {
        statusCode: 201,
        message: "Driver retrieved successfully.",
        success: true,
        data: driver
    })

})

const getDriverProfile = catchAsync(async (req: Request, res: Response) => {

    const userId = req.user.id;
    const driver = await driverServices.getDriverProfile(userId);

    sendResponse(res, {
        statusCode: 201,
        message: "Driver profile retrieved successfully.",
        success: true,
        data: driver
    })

})
const getNearestDriver = catchAsync(async (req: Request, res: Response) => {

    const coords = req.body.coords;

    const driver = await driverServices.getNearestDriver(coords);

    sendResponse(res, {
        statusCode: 201,
        message: "Nearest driver retrieved successfully.",
        success: true,
        data: driver
    })

})

const updateDriverStatus = catchAsync(async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const status = req.body.acceptance;
    const response = await driverServices.updateDriverStatus(userId, status);

    sendResponse(res, {
        statusCode: 201,
        message: "Driver status updated successfully.",
        success: true,
        data: response
    })

})

const updateAvailability = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user.id;
    const availability = req.body.availability;
    const response = await driverServices.updateAvailability(userId, availability);

    sendResponse(res, {
        statusCode: 201,
        message: "Your availability updated successfully.",
        success: true,
        data: response
    })

})

const updateRating = catchAsync(async (req: Request, res: Response) => {
    const driverId = req.params.driverId;
    const rating = req.body.rating;
    const response = await driverServices.updateRating(driverId, Number(rating));

    sendResponse(res, {
        statusCode: 201,
        message: "Rating updated successfully.",
        success: true,
        data: response
    })

})

export const driverControllers = {
    createDriver,
    getDriversWithUser,
    getDriverProfile,
    getNearestDriver,
    updateDriverStatus,
    updateAvailability,
    updateRating
} 
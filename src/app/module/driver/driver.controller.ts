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


const updateDriverStatus = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const status = req.body.acceptance;
    const response = await driverServices.updateDriverStatus(id, status);

    sendResponse(res, {
        statusCode: 201,
        message: "Driver status updated successfully.",
        success: true,
        data: response
    })

})
const updateAvailability = catchAsync(async (req: Request, res: Response) => {
    const id = req.user.id;
    const availability = req.body.availability;
    const response = await driverServices.updateAvailability(id, availability);

    sendResponse(res, {
        statusCode: 201,
        message: "Your availability updated successfully.",
        success: true,
        data: response
    })

})

export const driverControllers = {
    createDriver,
    getDriversWithUser,
    updateDriverStatus,
    updateAvailability
} 
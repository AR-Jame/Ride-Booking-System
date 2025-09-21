/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { rideServices } from "./ride.service";
import { sendResponse } from "../../utils/sendResponse";

const createRideRequest = catchAsync(async (req: Request, res: Response) => {
    const body = req.body;
    const rider = req.user.id;
    const rideData = await rideServices.createRideRequest(body, rider);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Ride request created successfully",
        data: rideData
    })
})


const getAllRides = catchAsync(async (req: Request, res: Response) => {

    const query = req.query;
    const rideData = await rideServices.getAllRides(query as any);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Ride retrieved successfully",
        data: rideData
    })
})
const getCurrentRide = catchAsync(async (req: Request, res: Response) => {

    const user = req.user;
    const rideData = await rideServices.getCurrentRide(user);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Ride retrieved successfully",
        data: rideData
    })
})

const rideHistory = catchAsync(async (req: Request, res: Response) => {

    const user = req.user;
    const query = req.query;
    const rideData = await rideServices.rideHistory(user, query as Record<string, string>);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Rides retrieved successfully",
        data: rideData
    })
})
const rideDetails = catchAsync(async (req: Request, res: Response) => {

    const rideId = req.params.rideId;

    const rideData = await rideServices.rideDetails(rideId);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Rides retrieved successfully",
        data: rideData
    })
})

const getEarningHistory = catchAsync(async (req: Request, res: Response) => {

    const user = req.user.id;
    const time = req.query.time || "daily";
    const rideData = await rideServices.getEarningHistory(user, time as string);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Earning history retrieved successfully",
        data: rideData
    })
})

const getNearByRides = catchAsync(async (req: Request, res: Response) => {

    const query = req.query;

    const rideData = await rideServices.getNearByRides(query as any);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Nearby rides retrieved successfully",
        data: rideData
    })
})

const cancelRide = catchAsync(async (req: Request, res: Response) => {

    const rideId = req.params.rideId;
    const user = req.user.id;

    const rideData = await rideServices.cancelRide(rideId, user);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Ride canceled successfully",
        data: rideData
    })
})

const updateRideStatus = catchAsync(async (req: Request, res: Response) => {

    const rideId = req.params.rideId;
    const status = req.body.status;

    const rideData = await rideServices.updateRideStatus(rideId, status);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Ride status updated successfully",
        data: rideData
    })
})

const acceptRide = catchAsync(async (req: Request, res: Response) => {

    const rideId = req.params.rideId;
    const userId = req.user.id;

    const rideData = await rideServices.acceptRide(rideId, userId);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Your're successfully accepted for this ride.",
        data: rideData
    })
})

export const rideControllers = {
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
}
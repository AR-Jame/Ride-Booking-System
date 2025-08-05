/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { userServices } from "./user.services";
import { sendResponse } from "../../utils/sendResponse";
import { catchAsync } from "../../utils/catchAsync";

const createUser = catchAsync(async (req: Request, res: Response) => {
    const body = req.body;

    const data = await userServices.createUser(body);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "User created successfully",
        data: data
    })
})

const getUsers = catchAsync(async (req: Request, res: Response) => {

    const query = req.query;

    const users = await userServices.getUsers(query as any);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User retrieved successfully",
        data: users
    })
})

const getProfile = catchAsync(async (req: Request, res: Response) => {

    const userId = req.user.id;

    const user = await userServices.getProfile(userId);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User profile retrieved successfully",
        data: user
    })
})

const updateUser = catchAsync(async (req: Request, res: Response) => {

    const userId = req.params.userId;
    const payload = req.body;
    const decodedToken = req.user;

    const user = await userServices.updateUserActivation(userId, payload, decodedToken);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User updated successfully",
        data: user
    })
})


export const userControllers = {
    createUser,
    getUsers,
    updateUser,
    getProfile
}
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



export const userControllers = {
    createUser
}
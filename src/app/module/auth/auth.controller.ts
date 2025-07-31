import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { authServices } from "./auth.services";
import { sendResponse } from "../../utils/sendResponse";

const login = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;

    const data = await authServices.login(payload);

    res.cookie("accessToken", data.accessToken)
    res.cookie("refreshToken", data.refreshToken)

    sendResponse(res, {
        statusCode: 200,
        message: "User logged in successfully",
        success: true,
        data: data
    })

})

export const authControllers = {
    login
}
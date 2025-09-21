import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { authServices } from "./auth.services";
import { sendResponse } from "../../utils/sendResponse";

const login = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;

    const data = await authServices.login(payload);

    res.cookie("accessToken", data.accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none"
    })
    res.cookie("refreshToken", data.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none"
    })

    sendResponse(res, {
        statusCode: 200,
        message: "User logged in successfully",
        success: true,
        data: data
    })

})


const getAccessToken = catchAsync(async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;

    const data = await authServices.getAccessToken(refreshToken);

    res.cookie("accessToken", data.accessToken)

    sendResponse(res, {
        statusCode: 200,
        message: "access token generate successfully",
        success: true,
        data: data
    })
})

export const authControllers = {
    login,
    getAccessToken
}
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { env } from "../config/env";

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

    const statusCode = 500;

    res.status(statusCode).json({
        success: false,
        statusCode: statusCode,
        message: err.message,
        err: env.NODE_ENV === 'development' ? err : null,
        stack: env.NODE_ENV === 'development' ? err.stack : null
    })
}
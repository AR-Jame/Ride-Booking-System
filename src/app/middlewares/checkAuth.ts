import { NextFunction, Request, Response } from "express";
import { VerifyToken } from "../utils/jwt";
import { env } from "../config/env";

export const checkAuth = (...role: string[]) => (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers.authorization;

    if (!token) {
        throw new Error("Token does not found.")
    }

    const verifiedToken = VerifyToken(token, env.JWT_ACCESS_SECRET);

    if (!role.includes(verifiedToken.role)) {
        throw new Error("These resources aren't available for you.")
    }

    next()
}
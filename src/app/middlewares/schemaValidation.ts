import { NextFunction, Request, Response } from "express";
import { ZodObject } from "zod";

export const zodValidation = (schema: ZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body = await schema.parseAsync(req.body);
        next();
    } catch (error) {
        console.log(error);
        next(error)
    }
}

// const catchAsync = (fn) => (req, res, next) => {
//     Promise.resolve(fn()).catch(err => {
//         next(err)
//     })
// }

import { NextFunction, Request, RequestHandler, Response } from "express"


export const catchAsync = (fn: RequestHandler) => {

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await fn(req, res, next)
        } catch (error) {
            next(error)
        }
    }
}
import { Request, Response } from "express";

const notFound = (req: Request, res: Response) => {
    res
        .status(404)
        .json({
            statusCode: 404,
            success: false,
            message: "Route not found",
            err: {}
        })
}

export default notFound
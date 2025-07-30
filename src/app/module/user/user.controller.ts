import { Request, Response } from "express";
import { userServices } from "./user.services";

const createUser = async (req: Request, res: Response) => {
    try {
        const body = req.body;

        const data = await userServices.createUser(body);

        res.send({
            success: true,
            message: "User updated successfully",
            data: data
        })

    } catch (error) {
        console.log(error);
        throw new Error('There is a problem here')
    }
}


export const userControllers = {
    createUser
}
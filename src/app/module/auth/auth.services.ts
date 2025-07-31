import { env } from "../../config/env";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

const login = async (payload: Partial<IUser>) => {

    const isUserExist = await User.findOne({ email: payload.email });

    if (!isUserExist) {
        throw new Error("This user does not exist")
    }

    const isPasswordMatched = await bcryptjs.compare(payload.password as string, isUserExist.password)

    if (!isPasswordMatched) {
        throw new Error("Password does not matched")
    }

    const jwtPayload = {
        id: isUserExist._id,
        email: payload.name,
        role: isUserExist.role
    }

    const accessToken = jwt.sign(
        jwtPayload,
        env.JWT_ACCESS_SECRET,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        { expiresIn: env.JWT_ACCESS_EXPIRES as any }
    );

    const refreshToken = jwt.sign(
        jwtPayload,
        env.JWT_REFRESH_SECRET,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        { expiresIn: env.JWT_REFRESH_EXPIRES as any }
    )


    return {
        accessToken,
        refreshToken
    }

}

export const authServices = {
    login
}
import { env } from "../../config/env";
import { generateToken } from "../../utils/jwt";
import { isActive, IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import bcryptjs from 'bcryptjs'
import jwt, { JwtPayload } from 'jsonwebtoken'

const login = async (payload: Partial<IUser>) => {

    const isUserExist = await User.findOne({ email: payload.email });

    if (!isUserExist || isUserExist.isDeleted === true) {
        throw new Error("This user does not exist")
    }

    const isPasswordMatched = await bcryptjs.compare(payload.password as string, isUserExist.password)

    if (!isPasswordMatched) {
        throw new Error("Password does not matched")
    }

    if (isUserExist.isActive !== isActive.ACTIVE) {
        throw new Error("User does not active")
    }

    const jwtPayload = {
        id: isUserExist._id,
        email: payload.email,
        role: isUserExist.role
    }

    const accessToken = generateToken(jwtPayload, env.JWT_ACCESS_SECRET, env.JWT_ACCESS_EXPIRES)
    const refreshToken = generateToken(jwtPayload, env.JWT_REFRESH_SECRET, env.JWT_REFRESH_EXPIRES)


    return {
        accessToken,
        refreshToken
    }

}

const getAccessToken = async (refreshToken: string) => {
    const verifyRefreshToken = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET) as JwtPayload;

    const isUserExist = await User.findOne({ email: verifyRefreshToken.email });

    if (!isUserExist || isUserExist.isDeleted === true) {
        throw new Error("This user does not exist")
    }
    if (isUserExist.isActive !== isActive.ACTIVE) {
        throw new Error("User does not active")
    }

    const jwtPayload = {
        id: isUserExist._id,
        email: verifyRefreshToken.email,
        role: isUserExist.role
    }

    const accessToken = generateToken(jwtPayload, env.JWT_ACCESS_SECRET, env.JWT_ACCESS_EXPIRES)
    
    return {
        accessToken
    }
}

export const authServices = {
    login,
    getAccessToken
}
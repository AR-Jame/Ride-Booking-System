/* eslint-disable @typescript-eslint/no-unused-vars */
import { env } from "../../config/env";
import { IAuthProvider, IUser, Role } from "./user.interface";
import bcryptjs from 'bcryptjs';
import { User } from "./user.model";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";
import AppError from "../../errorHelper/AppError";

const createUser = async (body: Partial<IUser>) => {
    const { email, password, ...rest } = body;

    const hashedPassword = await bcryptjs.hash(password as string, Number(env.BCRYPT_SALT_ROUND))

    const authProviders: IAuthProvider = {
        provider: "credentials",
        providerId: email as string
    }

    const user = await User.create({
        email,
        password: hashedPassword,
        auths: [authProviders],
        ...rest
    });

    return user
}

const getUsers = async (query: Record<string, string>) => {

    const queryBuilder = new QueryBuilder(User.find(), query);

    const data = await queryBuilder
        .filter()
        .fieldFilter()
        .paginate()
        .build();

    return data
}

const updateUserActivation = async (userId: string, payload: Partial<IUser>, decodedToken: JwtPayload) => {

    if (payload.role) {
        if (decodedToken.role === Role.RIDER || decodedToken.role === Role.DRIVER) {
            throw new Error("You are not authorized.")
        }

        if (payload.role === Role.SUPER_ADMIN && decodedToken.role === Role.ADMIN) {
            throw new Error("You are not authorized.")
        }

    }

    if (payload.isActive || payload.isDeleted) {
        if (decodedToken.role === Role.RIDER || decodedToken.role === Role.DRIVER) {
            throw new Error("You are not authorized.")
        }

    }

    if (payload.password) {
        payload.password = await bcryptjs.hash(payload.password, env.BCRYPT_SALT_ROUND);
    }

    const updatedUser = await User.findByIdAndUpdate(userId, payload, { new: true })

    return updatedUser
}

const getProfile = async (userId: Types.ObjectId) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new AppError(404, "User Does not found")
    }

    const { password, ...rest } = user?.toObject() as IUser;

    return rest;
}

const getUserDetails = async (userId: string) => {
    const user = await User.findById(userId);
    return user;
}

export const userServices = {
    createUser,
    getUsers,
    updateUserActivation,
    getProfile,
    getUserDetails
}
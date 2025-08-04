/* eslint-disable @typescript-eslint/no-dynamic-delete */
import { env } from "../../config/env";
import { IAuthProvider, IUser } from "./user.interface";
import bcryptjs from 'bcryptjs';
import { User } from "./user.model";
import { QueryBuilder } from "../../utils/QueryBuilder";

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


export const userServices = {
    createUser,
    getUsers
}


/**
 * sorting
 * field filtering
 * filtering
 * searching
 * pagination
*/
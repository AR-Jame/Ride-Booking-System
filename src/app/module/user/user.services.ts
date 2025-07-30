import { env } from "../../config/env";
import { IAuthProvider, IUser } from "./user.interface";
import bcryptjs from 'bcryptjs';
import { User } from "./user.model";

const createUser = async (body: Partial<IUser>) => {
    const { email, password, ...rest } = body;

    const hashedPassword = bcryptjs.hash(password as string, Number(env.BCRYPT_SALT_ROUND))

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


export const userServices = {
    createUser
}
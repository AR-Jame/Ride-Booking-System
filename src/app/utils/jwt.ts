/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt, { JwtPayload } from 'jsonwebtoken';


export const generateToken = (payload: JwtPayload, secret: string, expiresIn: string) => {
    const token = jwt.sign(
        payload,
        secret,
        { expiresIn: expiresIn as any }
    );

    return token
}

export const VerifyToken = (token: string, secret: string) => {
    const verifiedToken = jwt.verify(token, secret) as JwtPayload
    return verifiedToken
}
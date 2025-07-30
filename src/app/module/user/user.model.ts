import { model, Schema } from "mongoose";
import { IAuthProvider, isActive, IUser, Role } from "./user.interface";

const authProviderSchema = new Schema<IAuthProvider>({
    provider: { type: String, required: true },
    providerId: { type: String, required: true },
}, {
    versionKey: false,
    _id: false
})

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    role: { type: String, required: true, enum: Object.values(Role), default: Role.RIDER },
    address: { type: String },
    auths: { type: [authProviderSchema], required: true },
    isActive: { type: String, enum: Object.keys(isActive) },
    isDeleted: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false }
}, {
    timestamps: true,
    versionKey: false
});


export const User = model<IUser>('User', userSchema)
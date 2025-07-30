export enum Role {
    SUPER_ADMIN = "SUPER_ADMIN",
    ADMIN = "ADMIN",
    RIDER = "RIDER",
    DRIVER = "DRIVER",
}

export interface IAuthProvider {
    provider: "credentials" | 'google';
    providerId: string
}

export enum isActive {
    ACTIVE = "ACTIVE",
    INACTIVE = 'INACTIVE',
    BLOCKED = "BLOCKED",

}

// interface IAddress {
//     division: string;
//     area: string;
//     Specification: string;
// }

export interface IUser {
    name: string;
    email: string;
    password: string;
    phone?: string;
    role?: Role;
    address?: string;
    auths: IAuthProvider[];
    isActive: isActive;
    isDeleted: boolean
    isVerified?: boolean; //TODO: we may need to change this
    picture?: string;
}
/* eslint-disable @typescript-eslint/no-explicit-any */
import { JwtPayload } from "jsonwebtoken";
import { IDriver, IDriverStatus } from "./driver.interface";
import { User } from "../user/user.model";
import { isActive, Role } from "../user/user.interface";
import { Driver } from "./driver.model";
import { QueryBuilder } from "../../utils/QueryBuilder";

const createDriver = async (body: Partial<IDriver>, payload: JwtPayload) => {

    const isUserExist = await User.findOne({ email: payload.email });

    if (!isUserExist || isUserExist.isDeleted === true) {
        throw new Error("This user does not exist.")
    }
    if (isUserExist.isActive !== isActive.ACTIVE) {
        throw new Error("This user does not active.")
    }

    body.status = IDriverStatus.REQUESTED;

    const driver = await Driver.create(body);

    return driver;
}

const getDriversWithUser = async (query: Record<string, string>) => {
    const queryBuilder = new QueryBuilder(Driver.find(), query)

    const drivers = await queryBuilder
        .filter()
        .sort()
        .fieldFilter()
        .population('user')
        .paginate()
        .build()
    return drivers
}

const updateDriverStatus = async (id: string, status: string) => {

    if (status === "yes") {
        const updatedUser = await User.findByIdAndUpdate(id, { role: Role.DRIVER });
        if (!updatedUser) {
            throw new Error("User does not exists.")
        }
        await Driver.findOneAndUpdate({ user: id }, { status: IDriverStatus.APPROVED })
        return true
    }
    else if (status === "no") {
        await Driver.findOneAndUpdate({ user: id }, { status: IDriverStatus.SUSPEND })
        return true
    }
    else {
        throw new Error("Invalid request.")
    }

}

const updateAvailability = async (id: string, availability: boolean) => {

    const isUserExist = await Driver.findOne({ user: id });

    console.log(isUserExist);

    if (!isUserExist) {
        throw new Error("Driver does not found");
    }
    else if (isUserExist.status !== IDriverStatus.APPROVED) {
        throw new Error("We can't update your status right now.");
    }

    await Driver.updateOne({ _id: id, }, { status: availability });

    return true
}

export const driverServices = {
    createDriver,
    getDriversWithUser,
    updateDriverStatus,
    updateAvailability
}
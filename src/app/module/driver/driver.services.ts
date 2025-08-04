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
    body.user = payload.id;

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
};

const getDriverProfile = async (id: string) => {

    const data = await Driver.findOne({ user: id }).populate("user");

    if (!data) {
        throw new Error("Driver does not exists.")
    }
    return data
}

const getNearbyDrivers = async (coords: number[]) => {

    const data = await Driver.find({
        currentLocation: {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: coords
                },
                $maxDistance: 5000
            }
        }
    })

    return data;
}

const updateDriverStatus = async (userId: string, status: string) => {

    if (status === "yes") {
        const updatedUser = await User.findByIdAndUpdate(userId, { role: Role.DRIVER });
        if (!updatedUser) {
            throw new Error("User does not exists.")
        }
        await Driver.findOneAndUpdate({ user: userId }, { status: IDriverStatus.APPROVED })
        return true
    }
    else if (status === "no") {
        await Driver.findOneAndUpdate({ user: userId }, { status: IDriverStatus.SUSPEND })
        return true
    }
    else {
        throw new Error("Invalid request.")
    }

}

const updateAvailability = async (userId: string, availability: boolean) => {

    const isUserExist = await Driver.findOne({ user: userId });

    if (!isUserExist) {
        throw new Error("Driver does not found");
    }
    else if (isUserExist.status !== IDriverStatus.APPROVED) {
        throw new Error("We can't update your status right now.");
    }

    await Driver.updateOne({ _id: userId, }, { status: availability });

    return true
}

const updateRating = async (id: string, rating: number) => {

    if (rating < 1 || rating > 5) {
        throw new Error("Rating must be between 1 to 5.")
    }

    const data = await Driver.findByIdAndUpdate(
        id,
        [
            {
                $set: {
                    rating: { $add: [{ $ifNull: ["$rating", 0] }, rating] },
                    ratingCount: { $add: [{ $ifNull: ["$ratingCount", 0] }, 1] },
                }
            }
        ],
        {
            new: true
        }
    )

    return data
}

export const driverServices = {
    createDriver,
    getDriversWithUser,
    getDriverProfile,
    updateDriverStatus,
    updateAvailability,
    updateRating,
    getNearbyDrivers
}
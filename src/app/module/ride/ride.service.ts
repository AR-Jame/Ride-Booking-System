import mongoose, { Types } from "mongoose";
import { IRide, IRideStatusEnum } from "./ride.interface";
import { Ride } from "./ride.model"
import { QueryBuilder } from "../../utils/QueryBuilder";
import { JwtPayload } from "jsonwebtoken";
import { Role } from "../user/user.interface";
import AppError from "../../errorHelper/AppError";

const createRideRequest = async (body: Partial<IRide>, rider: Types.ObjectId) => {
    body.rider = rider;
    const data = await Ride.create(body);
    return data
}

const acceptRide = async (rideId: string, userId: Types.ObjectId) => {

    const activeRide = await Ride.findOne({
        driver: userId,
        currentStatus: { $nin: [IRideStatusEnum.CANCELED, IRideStatusEnum.COMPLETED] }
    });

    if (activeRide) {
        throw new Error("You are already in a ride.")
    }

    const ride = await Ride.findById(rideId);

    if (!ride) {
        throw new Error("Ride does not found")
    }

    if (ride.currentStatus !== IRideStatusEnum.REQUESTED) {
        throw new AppError(400, "Someone already accept this ride.")
    }

    const updatedRide = await Ride.findByIdAndUpdate(
        rideId,
        {
            $set: { driver: userId, currentStatus: IRideStatusEnum.ACCEPTED },
            $addToSet: { status: { status: IRideStatusEnum.ACCEPTED, at: new Date() } }
        },
        { new: true }
    )


    return updatedRide
}

const getAllRides = async (query: Record<string, string>) => {
    const queryBuilder = new QueryBuilder(Ride.find(), query)

    const data = queryBuilder.filter().fieldFilter().sort().paginate().build();

    return data;
}

const rideHistory = async (userPayload: JwtPayload) => {

    let rides;

    if (userPayload.role === Role.DRIVER) {
        rides = await Ride.find({ driver: userPayload.id, "status.status": IRideStatusEnum.COMPLETED });

    } else if (userPayload.role === Role.RIDER) {
        rides = await Ride.find({ rider: userPayload.id });
    }

    return rides
}

const rideDetails = async (rideId: string) => {
    const data = await Ride.findById(rideId);
    return data
}

const getCurrentRide = async (decodedToken: JwtPayload) => {
    let ride;

    if (decodedToken.role === Role.DRIVER) {
        ride = await Ride.findOne({ driver: decodedToken.id, currentStatus: { $nin: ['CANCELED', "COMPLETED"] } });
    }
    else if (decodedToken.role === Role.RIDER) {
        ride = await Ride.findOne({ rider: decodedToken.id, currentStatus: { $nin: ['CANCELED', "COMPLETED"] } });
    }

    return ride;
}

const getEarningHistory = async (userId: Types.ObjectId, time: string) => {

    const driverId = new mongoose.Types.ObjectId(userId);
    let data;
    if (time === 'daily') {
        data = await Ride.aggregate([
            { $match: { driver: driverId } },
            {
                $group: {
                    _id: {
                        date: {
                            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
                        }
                    },
                    totalEarnings: { $sum: "$fare" }
                }
            },
            { $sort: { "_id.date": 1 } }
        ]);
    }
    else if (time === "monthly") {
        data = await Ride.aggregate([
            { $match: { driver: driverId } },
            {
                $group: {
                    _id: {
                        month: {
                            $dateToString: { format: "%Y-%m", date: "$createdAt" }
                        }
                    },
                    totalEarnings: { $sum: "$fare" }
                }
            },
            { $sort: { "_id.month": 1 } }
        ]);
    }

    return data;
}

const getNearByRides = async (query: Record<string, string>) => {

    const lat = query.latitude;
    const lnt = query.longitude;

    const coords = [Number(lat), Number(lnt)];


    const data = await Ride.find({
        arrival: {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: coords
                },
                $maxDistance: 5000
            }
        },
        currentStatus: IRideStatusEnum.REQUESTED
    })

    return data;
}

const cancelRide = async (rideId: string, userId: Types.ObjectId) => {
    const ride = await Ride.findById(rideId);

    if (!ride) {
        throw new Error("Ride does not exists.")
    }

    if (ride.currentStatus !== IRideStatusEnum.REQUESTED) {
        throw new AppError(400, "You can't cancel this ride in this stage.")
    }

    if (ride.driver !== userId && ride.rider !== userId) {
        throw new Error("You are not driver or rider for this ride. So, who are you!!!")
    }

    const updatedRide = await Ride.findByIdAndUpdate(
        rideId,
        {
            $set: { canceledBy: userId, currentStatus: IRideStatusEnum.CANCELED },
            $addToSet: { status: { status: IRideStatusEnum.CANCELED, at: new Date() } }
        },
        { new: true }
    )

    return updatedRide

}

const updateRideStatus = async (rideId: string, status: string) => {

    const updatedRide = await Ride.findByIdAndUpdate(
        rideId,
        {
            $set: { currentStatus: status },
            $push: { status: { status, at: new Date() } }
        },
        { new: true }
    );

    return updatedRide
}


export const rideServices = {
    createRideRequest,
    getAllRides,
    rideHistory,
    rideDetails,
    getEarningHistory,
    getCurrentRide,
    getNearByRides,
    acceptRide,
    cancelRide,
    updateRideStatus
}
import { Router } from "express";
import { rideControllers } from "./ride.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";

const router = Router();


router.post('/create',
    checkAuth(Role.RIDER),
    rideControllers.createRideRequest
)
router.get('/',
    // checkAuth(Role.ADMIN),
    rideControllers.getAllRides
)

router.get('/my-rides',
    checkAuth(Role.RIDER, Role.DRIVER),
    rideControllers.getRideByUser
)

router.get('/my-earning',
    checkAuth(Role.DRIVER),
    rideControllers.getEarningHistory
)

router.get('/cancel-ride/:rideId',
    checkAuth(Role.DRIVER, Role.RIDER),
    rideControllers.cancelRide
)

router.patch('/update-ride-status/:rideId',
    checkAuth(Role.DRIVER),
    rideControllers.updateRideStatus
)

router.get('/accept-ride/:rideId',
    checkAuth(Role.DRIVER),
    rideControllers.acceptRide
)

export const rideRoutes = router
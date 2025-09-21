import { Router } from "express";
import { rideControllers } from "./ride.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { zodValidation } from "../../middlewares/schemaValidation";
import { createRideSchema } from "./ride.validation";

const router = Router();


router.post('/create',
    zodValidation(createRideSchema),
    checkAuth(Role.RIDER),
    rideControllers.createRideRequest
)
router.get('/',
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN, Role.DRIVER),
    rideControllers.getAllRides
)

router.get('/current-ride',
    checkAuth(Role.RIDER, Role.DRIVER),
    rideControllers.getCurrentRide
)

router.get('/my-rides',
    checkAuth(Role.RIDER, Role.DRIVER),
    rideControllers.rideHistory
)

router.get('/ride-details/:rideId',
    checkAuth(...Object.values(Role)),
    rideControllers.rideDetails
)

router.get('/my-earning',
    checkAuth(Role.DRIVER),
    rideControllers.getEarningHistory
)

router.get('/cancel-ride/:rideId',
    checkAuth(Role.DRIVER, Role.RIDER),
    rideControllers.cancelRide
)

router.get('/nearby-rides',
    checkAuth(Role.DRIVER),
    rideControllers.getNearByRides
)

router.patch('/update-ride-status/:rideId',
    checkAuth(Role.DRIVER),
    rideControllers.updateRideStatus
)

router.patch('/accept-ride/:rideId',
    checkAuth(Role.DRIVER),
    rideControllers.acceptRide
)

export const rideRoutes = router
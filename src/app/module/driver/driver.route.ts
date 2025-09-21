import { Router } from "express";
import { driverControllers } from "./driver.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { zodValidation } from "../../middlewares/schemaValidation";
import { createDriverSchema } from "./driver.validation";

const router = Router();

router.post("/create",
    zodValidation(createDriverSchema),
    checkAuth(Role.RIDER),
    driverControllers.createDriver
);


router.post("/nearest-driver",
    checkAuth(Role.RIDER),
    driverControllers.getNearbyDrivers
);

router.get("/",
    checkAuth(...Object.values(Role)),
    driverControllers.getDriversWithUser
);

router.get("/me",
    checkAuth(Role.DRIVER),
    driverControllers.getDriverProfile
);

router.patch('/update-status/:userId',
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    driverControllers.updateDriverStatus
)
router.patch('/update-availability',
    checkAuth(Role.DRIVER),
    driverControllers.updateAvailability
)
router.patch('/update-rating/:driverId',
    checkAuth(Role.RIDER),
    driverControllers.updateRating
)

export const driverRoutes = router;
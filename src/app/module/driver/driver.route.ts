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

router.get("/",
    // checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    checkAuth(Role.RIDER),
    driverControllers.getDriversWithUser
)

router.patch('/update-status/:id',
    // checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    driverControllers.updateDriverStatus
)
router.patch('/update-availability',
    checkAuth(Role.DRIVER),
    driverControllers.updateAvailability
)

export const driverRoutes = router;
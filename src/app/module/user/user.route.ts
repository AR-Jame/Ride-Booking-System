import { Router } from "express";
import { userControllers } from "./user.controller";
import { Role } from "./user.interface";
import { checkAuth } from "../../middlewares/checkAuth";
import { zodValidation } from "../../middlewares/schemaValidation";
import { createUserSchema } from "./user.validation";

const router = Router();

router.post('/create',
    zodValidation(createUserSchema),
    userControllers.createUser
);

router.get('/',
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    userControllers.getUsers
);

router.get('/me',
    checkAuth(...Object.values(Role)),
    userControllers.getProfile
);

router.get('/user-details/:userId',
    checkAuth(...Object.values(Role)),
    userControllers.getUserDetails
);

router.patch('/update-user/:userId',
    checkAuth(...Object.values(Role)),
    userControllers.updateUser
)

export const userRoutes = router
import { Router } from "express";
import { userControllers } from "./user.controller";
import { Role } from "./user.interface";
import { checkAuth } from "../../middlewares/checkAuth";

const router = Router();

router.post('/create', userControllers.createUser);
router.get('/', checkAuth(Role.ADMIN, Role.RIDER), userControllers.getUsers);

export const userRoutes = router
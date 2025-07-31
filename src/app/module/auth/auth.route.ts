import { Router } from "express";
import { authControllers } from "./auth.controller";

const router = Router();


router.post('/login', authControllers.login);
router.get('/access-token', authControllers.getAccessToken)


export const authRoutes = router;
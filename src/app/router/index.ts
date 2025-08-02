import Router from 'express';
import { userRoutes } from '../module/user/user.route';
import { authRoutes } from '../module/auth/auth.route';
import { driverRoutes } from '../module/driver/driver.route';

export const router = Router();

const moduleRoutes = [
    {
        path: '/user',
        route: userRoutes
    },
    {
        path: "/auth",
        route: authRoutes
    },
    {
        path: "/driver",
        route: driverRoutes
    }
]


moduleRoutes.forEach(route => {
    router.use(route.path, route.route)
})
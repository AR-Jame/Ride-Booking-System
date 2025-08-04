import Router from 'express';
import { userRoutes } from '../module/user/user.route';
import { authRoutes } from '../module/auth/auth.route';
import { driverRoutes } from '../module/driver/driver.route';
import { rideRoutes } from '../module/ride/ride.route';

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
    },
    {
        path: "/ride",
        route: rideRoutes
    }
]


moduleRoutes.forEach(route => {
    router.use(route.path, route.route)
})
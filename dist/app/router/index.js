"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../module/user/user.route");
const auth_route_1 = require("../module/auth/auth.route");
const driver_route_1 = require("../module/driver/driver.route");
const ride_route_1 = require("../module/ride/ride.route");
exports.router = (0, express_1.default)();
const moduleRoutes = [
    {
        path: '/user',
        route: user_route_1.userRoutes
    },
    {
        path: "/auth",
        route: auth_route_1.authRoutes
    },
    {
        path: "/driver",
        route: driver_route_1.driverRoutes
    },
    {
        path: "/ride",
        route: ride_route_1.rideRoutes
    }
];
moduleRoutes.forEach(route => {
    exports.router.use(route.path, route.route);
});

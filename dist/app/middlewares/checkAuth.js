"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const jwt_1 = require("../utils/jwt");
const env_1 = require("../config/env");
const checkAuth = (...authRoles) => (req, res, next) => {
    const token = req.cookies.accessToken || req.headers.authorization;
    if (!token) {
        throw new Error("Token does not found.");
    }
    const verifiedToken = (0, jwt_1.VerifyToken)(token, env_1.env.JWT_ACCESS_SECRET);
    if (!authRoles.includes(verifiedToken.role)) {
        throw new Error("These resources aren't available for you.");
    }
    req.user = verifiedToken;
    next();
};
exports.checkAuth = checkAuth;

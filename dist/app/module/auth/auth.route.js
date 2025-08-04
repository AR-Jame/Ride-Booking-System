"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const router = (0, express_1.Router)();
router.post('/login', auth_controller_1.authControllers.login);
router.get('/access-token', auth_controller_1.authControllers.getAccessToken);
exports.authRoutes = router;

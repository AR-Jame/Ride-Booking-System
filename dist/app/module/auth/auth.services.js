"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServices = void 0;
const env_1 = require("../../config/env");
const jwt_1 = require("../../utils/jwt");
const user_interface_1 = require("../user/user.interface");
const user_model_1 = require("../user/user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield user_model_1.User.findOne({ email: payload.email });
    if (!isUserExist || isUserExist.isDeleted === true) {
        throw new Error("This user does not exist");
    }
    const isPasswordMatched = yield bcryptjs_1.default.compare(payload.password, isUserExist.password);
    if (!isPasswordMatched) {
        throw new Error("Password does not matched");
    }
    if (isUserExist.isActive !== user_interface_1.isActive.ACTIVE) {
        throw new Error("User does not active");
    }
    const jwtPayload = {
        id: isUserExist._id,
        email: payload.email,
        role: isUserExist.role
    };
    const accessToken = (0, jwt_1.generateToken)(jwtPayload, env_1.env.JWT_ACCESS_SECRET, env_1.env.JWT_ACCESS_EXPIRES);
    const refreshToken = (0, jwt_1.generateToken)(jwtPayload, env_1.env.JWT_REFRESH_SECRET, env_1.env.JWT_REFRESH_EXPIRES);
    return {
        accessToken,
        refreshToken
    };
});
const getAccessToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    const verifyRefreshToken = jsonwebtoken_1.default.verify(refreshToken, env_1.env.JWT_REFRESH_SECRET);
    const isUserExist = yield user_model_1.User.findOne({ email: verifyRefreshToken.email });
    if (!isUserExist || isUserExist.isDeleted === true) {
        throw new Error("This user does not exist");
    }
    if (isUserExist.isActive !== user_interface_1.isActive.ACTIVE) {
        throw new Error("User does not active");
    }
    const jwtPayload = {
        id: isUserExist._id,
        email: verifyRefreshToken.email,
        role: isUserExist.role
    };
    const accessToken = (0, jwt_1.generateToken)(jwtPayload, env_1.env.JWT_ACCESS_SECRET, env_1.env.JWT_ACCESS_EXPIRES);
    return {
        accessToken
    };
});
exports.authServices = {
    login,
    getAccessToken
};

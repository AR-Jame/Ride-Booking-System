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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
const env_1 = require("../../config/env");
const user_interface_1 = require("./user.interface");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = require("./user.model");
const QueryBuilder_1 = require("../../utils/QueryBuilder");
const AppError_1 = __importDefault(require("../../errorHelper/AppError"));
const createUser = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = body, rest = __rest(body, ["email", "password"]);
    const hashedPassword = yield bcryptjs_1.default.hash(password, Number(env_1.env.BCRYPT_SALT_ROUND));
    const authProviders = {
        provider: "credentials",
        providerId: email
    };
    const user = yield user_model_1.User.create(Object.assign({ email, password: hashedPassword, auths: [authProviders] }, rest));
    return user;
});
const getUsers = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const queryBuilder = new QueryBuilder_1.QueryBuilder(user_model_1.User.find(), query);
    const data = yield queryBuilder
        .filter()
        .fieldFilter()
        .paginate()
        .build();
    return data;
});
const updateUserActivation = (userId, payload, decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload.role) {
        if (decodedToken.role === user_interface_1.Role.RIDER || decodedToken.role === user_interface_1.Role.DRIVER) {
            throw new Error("You are not authorized.");
        }
        if (payload.role === user_interface_1.Role.SUPER_ADMIN && decodedToken.role === user_interface_1.Role.ADMIN) {
            throw new Error("You are not authorized.");
        }
    }
    if (payload.isActive || payload.isDeleted) {
        if (decodedToken.role === user_interface_1.Role.RIDER || decodedToken.role === user_interface_1.Role.DRIVER) {
            throw new Error("You are not authorized.");
        }
    }
    if (payload.password) {
        payload.password = yield bcryptjs_1.default.hash(payload.password, env_1.env.BCRYPT_SALT_ROUND);
    }
    const updatedUser = yield user_model_1.User.findByIdAndUpdate(userId, payload, { new: true });
    return updatedUser;
});
const getProfile = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(userId);
    if (!user) {
        throw new AppError_1.default(404, "User Does not found");
    }
    const _a = user === null || user === void 0 ? void 0 : user.toObject(), { password } = _a, rest = __rest(_a, ["password"]);
    return rest;
});
exports.userServices = {
    createUser,
    getUsers,
    updateUserActivation,
    getProfile
};

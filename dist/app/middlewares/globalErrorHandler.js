"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const env_1 = require("../config/env");
const globalErrorHandler = (err, req, res, next) => {
    const statusCode = 500;
    res.status(statusCode).json({
        success: false,
        statusCode: statusCode,
        message: err.message,
        err: env_1.env.NODE_ENV === 'development' ? err : null,
        stack: env_1.env.NODE_ENV === 'development' ? err.stack : null
    });
};
exports.globalErrorHandler = globalErrorHandler;

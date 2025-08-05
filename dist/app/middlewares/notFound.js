"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notFound = (req, res) => {
    res
        .status(404)
        .json({
        statusCode: 404,
        success: false,
        message: "Route not found",
        err: {}
    });
};
exports.default = notFound;

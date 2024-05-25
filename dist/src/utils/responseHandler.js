"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapErrorResponse = exports.wrapResponse = void 0;
const wrapResponse = (res, status, message, data) => {
    res.status(status).json({
        status,
        message,
        data,
    });
};
exports.wrapResponse = wrapResponse;
const wrapErrorResponse = (res, status, message) => {
    res.status(status).json({
        status,
        message,
    });
};
exports.wrapErrorResponse = wrapErrorResponse;

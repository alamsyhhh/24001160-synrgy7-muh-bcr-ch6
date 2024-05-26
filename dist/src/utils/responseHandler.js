"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrorResponse = exports.handleBadRequestError = exports.handleInternalServerError = exports.handleNotFoundError = exports.wrapErrorResponse = exports.wrapResponse = void 0;
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
const handleNotFoundError = (res, message) => {
    (0, exports.wrapErrorResponse)(res, 404, message);
};
exports.handleNotFoundError = handleNotFoundError;
const handleInternalServerError = (res, message) => {
    (0, exports.wrapErrorResponse)(res, 500, message);
};
exports.handleInternalServerError = handleInternalServerError;
const handleBadRequestError = (res, message) => {
    (0, exports.wrapErrorResponse)(res, 400, message);
};
exports.handleBadRequestError = handleBadRequestError;
const handleErrorResponse = (res, status, message) => {
    (0, exports.wrapErrorResponse)(res, status, message);
};
exports.handleErrorResponse = handleErrorResponse;

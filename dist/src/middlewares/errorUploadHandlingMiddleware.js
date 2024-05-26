"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
function errorHandlingMiddleware(err, req, res, next) {
    if (err instanceof multer_1.default.MulterError) {
        // Handle MulterError here
        const errorResponse = {
            status: 400,
            message: 'Unexpected field. Please check your file upload',
        };
        res.status(400).json(errorResponse);
    }
    else {
        // Handle other errors
        console.error(err);
        const errorResponse = {
            status: 500,
            message: 'Internal Server Error',
        };
        res.status(500).json(errorResponse);
    }
}
exports.default = errorHandlingMiddleware;

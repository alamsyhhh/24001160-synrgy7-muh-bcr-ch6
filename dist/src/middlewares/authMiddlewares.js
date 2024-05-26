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
exports.authorizeRoles = exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const usersModel_1 = require("../db/models/usersModel");
const dotenv_1 = __importDefault(require("dotenv"));
const responseHandler_1 = require("../utils/responseHandler");
dotenv_1.default.config();
const authenticateToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return (0, responseHandler_1.handleErrorResponse)(res, 401, 'Access Token Required');
    }
    const token = authHeader.split(' ')[1].trim();
    try {
        const secretKey = process.env.JWT_SECRET;
        if (!secretKey) {
            throw new Error('JWT_SECRET is not defined');
        }
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        if (!decoded.id) {
            throw new Error('Token does not contain user ID');
        }
        const user = yield usersModel_1.UsersModel.query().findById(decoded.id);
        if (!user) {
            return (0, responseHandler_1.handleErrorResponse)(res, 404, 'User not found');
        }
        req.user = user;
        next();
    }
    catch (err) {
        return (0, responseHandler_1.handleErrorResponse)(res, 403, 'Invalid Access Token');
    }
});
exports.authenticateToken = authenticateToken;
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.roleId)) {
            return (0, responseHandler_1.handleErrorResponse)(res, 403, 'Access Denied');
        }
        next();
    };
};
exports.authorizeRoles = authorizeRoles;

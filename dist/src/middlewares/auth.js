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
dotenv_1.default.config(); // Load environment variables from .env file
const authenticateToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Access Token Required' });
    }
    const token = authHeader.split(' ')[1].trim(); // Ensure no extra spaces
    try {
        const secretKey = process.env.JWT_SECRET;
        if (!secretKey) {
            throw new Error('JWT_SECRET is not defined');
        }
        console.log('Token:', token); // Log the token
        console.log('Secret key:', secretKey); // Log the secret key
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        console.log('Decoded token:', decoded); // Log the decoded token
        if (!decoded.id) {
            throw new Error('Token does not contain user ID');
        }
        const user = yield usersModel_1.UsersModel.query().findById(decoded.id);
        if (!user) {
            return res.status(403).json({ message: 'User not found' });
        }
        req.user = user;
        next();
    }
    catch (err) {
        console.error('Error verifying token:', err);
        return res.status(403).json({ message: 'Invalid Access Token' });
    }
});
exports.authenticateToken = authenticateToken;
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        var _a;
        console.log('User Role:', (_a = req.user) === null || _a === void 0 ? void 0 : _a.roleId);
        console.log('Authorized Roles:', roles);
        if (!req.user || !roles.includes(req.user.roleId)) {
            return res.status(403).json({ message: 'Access Denied' });
        }
        next();
    };
};
exports.authorizeRoles = authorizeRoles;

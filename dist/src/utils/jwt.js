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
exports.getUsernameFromToken = exports.decryptToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const usersModel_1 = require("../db/models/usersModel");
dotenv_1.default.config(); // Load environment variables from .env
const secretKey = process.env.JWT_SECRET;
if (!secretKey) {
    throw new Error('JWT_SECRET is not defined in the environment variables');
}
const generateToken = (userId) => {
    const payload = { id: userId };
    const options = { expiresIn: '24h' }; // Token will expire in 1 hour
    return jsonwebtoken_1.default.sign(payload, secretKey, options);
};
exports.generateToken = generateToken;
const decryptToken = (token) => {
    console.log('Token to decrypt:', token); // Log token
    console.log('Using secret key:', secretKey); // Log secret key
    const tokenWithoutBearer = token.replace('Bearer ', ''); // Remove 'Bearer' from the token
    try {
        const decodedToken = jsonwebtoken_1.default.verify(tokenWithoutBearer, secretKey);
        console.log('Decoded token:', decodedToken); // Log decoded token
        return decodedToken.id;
    }
    catch (error) {
        console.error('Error decrypting token: ', error);
        return null;
    }
};
exports.decryptToken = decryptToken;
const getUsernameFromToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = (0, exports.decryptToken)(token);
    if (!userId) {
        return null;
    }
    try {
        const user = yield usersModel_1.UsersModel.query().findById(userId);
        return user ? user.username : null;
    }
    catch (error) {
        console.error('Error fetching user from database:', error);
        return null;
    }
});
exports.getUsernameFromToken = getUsernameFromToken;

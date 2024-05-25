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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const responseHandler_1 = require("../utils/responseHandler");
const usersServices_1 = require("../services/users/usersServices");
const usersRepository_1 = require("../repositories/users/usersRepository");
const objection_1 = require("objection");
class UsersController {
    constructor() {
        const usersRepository = new usersRepository_1.UsersRepository();
        this.usersService = new usersServices_1.UsersService(usersRepository);
        this.registerUser = this.registerUser.bind(this);
        this.loginUser = this.loginUser.bind(this);
        this.updateUserRole = this.updateUserRole.bind(this);
        this.getCurrentUser = this.getCurrentUser.bind(this);
        this.getAllUsers = this.getAllUsers.bind(this);
    }
    registerUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, email, password } = req.body;
            try {
                const userDto = yield this.usersService.registerUser(username, email, password);
                (0, responseHandler_1.wrapResponse)(res, 201, 'Register Success', userDto);
            }
            catch (error) {
                console.error('Error registering user:', error);
                if (error instanceof objection_1.ValidationError) {
                    (0, responseHandler_1.wrapErrorResponse)(res, 400, error.message);
                }
                else if (error instanceof Error) {
                    (0, responseHandler_1.wrapErrorResponse)(res, 500, error.message);
                }
                else {
                    (0, responseHandler_1.wrapErrorResponse)(res, 500, 'Internal server error');
                }
            }
        });
    }
    loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const result = yield this.usersService.loginUser(email, password);
                (0, responseHandler_1.wrapResponse)(res, 200, 'Login Success', result);
            }
            catch (error) {
                console.error('Error logging in user:', error);
                if (error instanceof objection_1.ValidationError) {
                    (0, responseHandler_1.wrapErrorResponse)(res, 400, error.message);
                }
                else if (error instanceof Error) {
                    (0, responseHandler_1.wrapErrorResponse)(res, 500, error.message);
                }
                else {
                    (0, responseHandler_1.wrapErrorResponse)(res, 500, 'Internal server error');
                }
            }
        });
    }
    getCurrentUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                if (user) {
                    const userDto = yield this.usersService.getCurrentUser(user.id);
                    (0, responseHandler_1.wrapResponse)(res, 200, 'User fetched successfully', { user: userDto });
                }
                else {
                    (0, responseHandler_1.wrapErrorResponse)(res, 404, 'User not found');
                }
            }
            catch (error) {
                console.error('Error fetching current user:', error);
                if (error instanceof Error) {
                    (0, responseHandler_1.wrapErrorResponse)(res, 500, error.message);
                }
                else {
                    (0, responseHandler_1.wrapErrorResponse)(res, 500, 'Internal server error');
                }
            }
        });
    }
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.usersService.getAllUsers();
                (0, responseHandler_1.wrapResponse)(res, 200, 'Users fetched successfully', users);
            }
            catch (error) {
                console.error('Error fetching all users:', error);
                if (error instanceof Error) {
                    (0, responseHandler_1.wrapErrorResponse)(res, 500, error.message);
                }
                else {
                    (0, responseHandler_1.wrapErrorResponse)(res, 500, 'Internal server error');
                }
            }
        });
    }
    updateUserRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.params;
            const { newRoleId } = req.body;
            try {
                const userDto = yield this.usersService.updateUserRole(userId, newRoleId);
                (0, responseHandler_1.wrapResponse)(res, 200, 'User role updated successfully', userDto);
            }
            catch (error) {
                console.error('Error updating user role:', error);
                if (error instanceof objection_1.ValidationError) {
                    (0, responseHandler_1.wrapErrorResponse)(res, 400, error.message);
                }
                else if (error instanceof Error) {
                    (0, responseHandler_1.wrapErrorResponse)(res, 500, error.message);
                }
                else {
                    (0, responseHandler_1.wrapErrorResponse)(res, 500, 'Internal server error');
                }
            }
        });
    }
}
exports.UsersController = UsersController;

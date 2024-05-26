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
exports.UsersService = void 0;
const uuid_1 = require("uuid");
const objection_1 = require("objection");
const usersValidators_1 = require("../../utils/usersValidators");
const jwtUtils_1 = require("../../utils/jwtUtils");
const usersDto_1 = require("../../dto/users/usersDto");
const usersCurrentDto_1 = require("../../dto/users/usersCurrentDto");
class UsersService {
    constructor(usersRepository, hashPassword, comparePassword) {
        this.usersRepository = usersRepository;
        this.hashPassword = hashPassword;
        this.comparePassword = comparePassword;
    }
    registerUser(username, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, usersValidators_1.validateUserInput)(username, email, password);
            const existingUser = yield this.usersRepository.findByEmail(email);
            if (existingUser) {
                throw new objection_1.ValidationError({
                    type: 'ModelValidation',
                    message: 'Email already registered',
                });
            }
            const hashedPassword = yield this.hashPassword(password);
            yield this.usersRepository.insertUser({
                id: (0, uuid_1.v4)(),
                username,
                email,
                password: hashedPassword,
                roleId: '1',
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        });
    }
    loginUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, usersValidators_1.validateLoginInput)(email, password);
            const user = yield this.usersRepository.findByEmail(email);
            if (!user) {
                throw new objection_1.ValidationError({
                    type: 'ModelValidation',
                    message: 'Invalid email or password',
                });
            }
            const passwordMatch = yield this.comparePassword(password, user.password);
            if (!passwordMatch) {
                throw new objection_1.ValidationError({
                    type: 'ModelValidation',
                    message: 'Invalid email or password',
                });
            }
            const token = (0, jwtUtils_1.generateToken)(user.id);
            return { user: new usersDto_1.UserDto(user.username), token };
        });
    }
    getCurrentUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const user = yield this.usersRepository.findById(userId);
            if (!user) {
                throw new objection_1.ValidationError({
                    type: 'ModelValidation',
                    message: 'User not found',
                });
            }
            const role = yield this.usersRepository.findRoleById(user.roleId);
            return new usersCurrentDto_1.UserCurrentDto(user.id, user.username, (_a = role === null || role === void 0 ? void 0 : role.userRole) !== null && _a !== void 0 ? _a : '');
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.usersRepository.findAllUsersWithRoles();
            const usersWithRoles = users.map((user) => { var _a, _b; return new usersCurrentDto_1.UserCurrentDto(user.id, user.username, (_b = (_a = user.role) === null || _a === void 0 ? void 0 : _a.userRole) !== null && _b !== void 0 ? _b : ''); });
            return usersWithRoles;
        });
    }
    updateUserRole(userId, newRoleId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersRepository.findById(userId);
            if (!user) {
                throw new objection_1.ValidationError({
                    type: 'ModelValidation',
                    message: 'User not found',
                });
            }
            if (newRoleId !== '2') {
                throw new objection_1.ValidationError({
                    type: 'ModelValidation',
                    message: 'Cannot update user role to super admin',
                });
            }
            if (user.roleId === '3') {
                throw new objection_1.ValidationError({
                    type: 'ModelValidation',
                    message: 'Cannot update super admin role',
                });
            }
            const updatedUser = yield this.usersRepository.updateUserRole(userId, newRoleId);
            return new usersDto_1.UserDto(updatedUser.username);
        });
    }
}
exports.UsersService = UsersService;

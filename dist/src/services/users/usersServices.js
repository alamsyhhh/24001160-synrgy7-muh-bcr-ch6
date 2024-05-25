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
exports.UsersService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
const objection_1 = require("objection");
const usersValidators_1 = require("../../utils/usersValidators");
const jwt_1 = require("../../utils/jwt");
const usersDto_1 = require("../../dto/users/usersDto");
const usersCurrentDto_1 = require("../../dto/users/usersCurrentDto");
const rolesModel_1 = require("../../db/models/rolesModel");
class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
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
            const saltRounds = 10;
            const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
            const id = (0, uuid_1.v4)();
            const user = yield this.usersRepository.insertUser({
                id,
                username,
                email,
                password: hashedPassword,
                roleId: '1',
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            return new usersDto_1.UserDto(user.username);
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
            const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
            if (!passwordMatch) {
                throw new objection_1.ValidationError({
                    type: 'ModelValidation',
                    message: 'Invalid email or password',
                });
            }
            const token = (0, jwt_1.generateToken)(user.id);
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
            // Ambil nama peran (role) dari tabel "roles" berdasarkan ID peran yang disimpan dalam tabel "users"
            const role = yield rolesModel_1.RolesModel.query().findById(user.roleId);
            return new usersCurrentDto_1.UserCurrentDto(user.id, user.username, (_a = role === null || role === void 0 ? void 0 : role.userRole) !== null && _a !== void 0 ? _a : '');
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.usersRepository.findAllUsersWithRoles();
            const usersWithRoles = yield Promise.all(users.map((user) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                const role = yield rolesModel_1.RolesModel.query().findById(user.roleId);
                return new usersCurrentDto_1.UserCurrentDto(user.id, user.username, (_a = role === null || role === void 0 ? void 0 : role.userRole) !== null && _a !== void 0 ? _a : '');
            })));
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

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
exports.UsersRepository = void 0;
const usersModel_1 = require("../../db/models/usersModel");
const rolesModel_1 = require("../../db/models/rolesModel");
class UsersRepository {
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return usersModel_1.UsersModel.query().findById(id);
        });
    }
    findRoleById(roleId) {
        return __awaiter(this, void 0, void 0, function* () {
            return rolesModel_1.RolesModel.query().findById(roleId);
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return usersModel_1.UsersModel.query().findOne({ email });
        });
    }
    insertUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return usersModel_1.UsersModel.query().insert(user);
        });
    }
    findAllUsersWithRoles() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield usersModel_1.UsersModel.query();
            const usersWithRoles = yield Promise.all(users.map((user) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                const role = yield rolesModel_1.RolesModel.query().findById(user.roleId);
                return Object.assign(Object.assign({}, user), { role: { userRole: (_a = role === null || role === void 0 ? void 0 : role.userRole) !== null && _a !== void 0 ? _a : '' } });
            })));
            return usersWithRoles;
        });
    }
    updateUserRole(userId, newRoleId) {
        return __awaiter(this, void 0, void 0, function* () {
            return usersModel_1.UsersModel.query().patchAndFetchById(userId, { roleId: newRoleId });
        });
    }
}
exports.UsersRepository = UsersRepository;

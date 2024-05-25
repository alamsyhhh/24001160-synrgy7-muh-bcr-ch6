"use strict";
// src/repositories/usersRepository.ts
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
const tokensModel_1 = require("../../db/models/tokensModel");
class UsersRepository {
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return usersModel_1.UsersModel.query().findById(id);
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
    insertToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            yield tokensModel_1.TokensModel.query().insert(token);
        });
    }
    updateUserRole(userId, newRoleId) {
        return __awaiter(this, void 0, void 0, function* () {
            return usersModel_1.UsersModel.query().patchAndFetchById(userId, { roleId: newRoleId });
        });
    }
}
exports.UsersRepository = UsersRepository;

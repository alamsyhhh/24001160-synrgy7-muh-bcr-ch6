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
exports.seed = void 0;
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
function seed(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        yield knex('users').del();
        yield knex('users').insert([
            {
                id: (0, uuid_1.v4)(),
                username: 'andi',
                email: 'member@gmail.com',
                password: yield bcrypt_1.default.hash('member12345', 10),
                roleId: '1',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: (0, uuid_1.v4)(),
                username: 'firman',
                email: 'admin@gmail.com',
                password: yield bcrypt_1.default.hash('admin12345', 10),
                roleId: '2',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: (0, uuid_1.v4)(),
                username: 'rizki',
                email: 'sAdmin@gmail.com',
                password: yield bcrypt_1.default.hash('sadmin12345', 10),
                roleId: '3',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    });
}
exports.seed = seed;

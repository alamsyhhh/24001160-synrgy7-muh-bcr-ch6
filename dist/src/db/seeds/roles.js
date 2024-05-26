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
exports.seed = void 0;
function seed(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield knex.transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                yield trx.raw('TRUNCATE TABLE roles RESTART IDENTITY CASCADE');
                yield trx('roles').insert([
                    { id: '1', userRole: 'member' },
                    { id: '2', userRole: 'admin' },
                    { id: '3', userRole: 'super admin' },
                ]);
            }));
        }
        catch (error) {
            console.error('Error seeding roles:', error);
        }
    });
}
exports.seed = seed;

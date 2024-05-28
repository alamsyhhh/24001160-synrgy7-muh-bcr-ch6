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
class CarsUsersService {
    constructor(repository) {
        this.repository = repository;
    }
    getAllCars(category_1, name_1, page_1) {
        return __awaiter(this, arguments, void 0, function* (category, name, page, pageSize = 10) {
            const totalCount = yield this.repository.getTotalCount(category, name);
            const totalPages = pageSize !== -1 ? Math.ceil(totalCount / pageSize) : 1;
            const cars = yield this.repository.getAllCars(category, name, page, pageSize);
            return {
                data: cars,
                totalPages,
            };
        });
    }
    getCarById(carId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.getCarById(carId);
        });
    }
}
exports.default = CarsUsersService;

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
const carsModel_1 = require("../../../db/models/carsModel");
class CarsUsersRepository {
    getAllCars(category, name, page, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = carsModel_1.CarsModel.query()
                .whereNull('deletedBy')
                .andWhere('onPublish', true);
            if (category) {
                const categoryLowerCase = category.toLowerCase();
                query.whereRaw('LOWER(category) = ?', [categoryLowerCase]);
            }
            if (name) {
                const nameLowerCase = name.toLowerCase();
                query.whereRaw('LOWER(name) LIKE ?', [`%${nameLowerCase}%`]);
            }
            if (pageSize && pageSize !== -1) {
                const offset = (page ? page - 1 : 0) * pageSize;
                query.offset(offset).limit(pageSize);
            }
            const cars = yield query;
            return cars.map((car) => ({
                id: car.id,
                name: car.name,
                category: car.category,
                price: car.price,
                image: car.image,
                startRent: car.startRent,
                finishRent: car.finishRent,
            }));
        });
    }
    getCarById(carId) {
        return __awaiter(this, void 0, void 0, function* () {
            const car = yield carsModel_1.CarsModel.query()
                .findById(carId)
                .whereNull('deletedBy')
                .andWhere('onPublish', true);
            if (!car)
                return undefined;
            return {
                id: car.id,
                name: car.name,
                category: car.category,
                price: car.price,
                image: car.image,
                startRent: car.startRent,
                finishRent: car.finishRent,
            };
        });
    }
    getTotalCount(category, name) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = carsModel_1.CarsModel.query()
                .whereNull('deletedBy')
                .andWhere('onPublish', true);
            if (category) {
                const categoryLowerCase = category.toLowerCase();
                query.whereRaw('LOWER(category) = ?', [categoryLowerCase]);
            }
            if (name) {
                const nameLowerCase = name.toLowerCase();
                query.whereRaw('LOWER(name) LIKE ?', [`%${nameLowerCase}%`]);
            }
            return query.resultSize();
        });
    }
}
exports.default = new CarsUsersRepository();

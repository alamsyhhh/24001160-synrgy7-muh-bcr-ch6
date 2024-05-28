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
const carsUsersService_1 = __importDefault(require("../../services/cars/carsUsers/carsUsersService"));
const responseHandler_1 = require("../../utils/responseHandler");
const carsUsersRepositories_1 = __importDefault(require("../../repositories/cars/carsUsers/carsUsersRepositories"));
class CarsUsersController {
    constructor() {
        this.carsUsersService = new carsUsersService_1.default(carsUsersRepositories_1.default);
        this.getAllCars = this.getAllCars.bind(this);
        this.getCarById = this.getCarById.bind(this);
    }
    getAllCars(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { category, name, page, pageSize } = req.query;
                const result = yield this.carsUsersService.getAllCars(category, name, page ? parseInt(page) : undefined, pageSize ? parseInt(pageSize) : undefined);
                (0, responseHandler_1.wrapResponse)(res, 200, 'Cars fetched successfully', result);
            }
            catch (error) {
                (0, responseHandler_1.wrapErrorResponse)(res, 500, 'Internal Server Error');
                console.log(error);
            }
        });
    }
    getCarById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const car = yield this.carsUsersService.getCarById(id);
                if (car) {
                    (0, responseHandler_1.wrapResponse)(res, 200, 'Car fetched successfully', car);
                }
                else {
                    (0, responseHandler_1.wrapErrorResponse)(res, 404, 'Car not found');
                }
            }
            catch (error) {
                (0, responseHandler_1.wrapErrorResponse)(res, 500, 'Internal Server Error');
            }
        });
    }
}
exports.default = new CarsUsersController();

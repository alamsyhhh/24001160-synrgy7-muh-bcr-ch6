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
const responseHandler_1 = require("../../../utils/responseHandler");
const uuid_1 = require("uuid");
const cloudinaryConfig_1 = __importDefault(require("../../../../config/cloudinaryConfig"));
const jwtUtils_1 = require("../../../utils/jwtUtils");
const multer_1 = require("../../../middlewares/multer");
const carsAdminRepository_1 = __importDefault(require("../../../repositories/cars/carsAdmin/carsAdminRepository"));
class CarService {
    getAllCars(res_1, category_1, name_1) {
        return __awaiter(this, arguments, void 0, function* (res, category, name, page = 1, pageSize = -1) {
            try {
                let cars;
                if (category || name || pageSize !== -1) {
                    cars = yield carsAdminRepository_1.default.getAllCars(category, name, page, pageSize);
                    if (cars.length === 0) {
                        (0, responseHandler_1.wrapErrorResponse)(res, 404, 'No cars found with the specified criteria');
                        return;
                    }
                    const totalCount = yield carsAdminRepository_1.default.getTotalCount(category, name);
                    const totalPages = pageSize !== -1 ? Math.ceil(totalCount / pageSize) : 1;
                    (0, responseHandler_1.wrapResponse)(res, 200, 'Get all car data successfully', {
                        data: cars,
                        totalPages,
                    });
                }
                else {
                    cars = yield carsAdminRepository_1.default.getAllCars();
                    if (cars.length === 0) {
                        (0, responseHandler_1.wrapErrorResponse)(res, 404, 'No cars found');
                    }
                    else {
                        (0, responseHandler_1.wrapResponse)(res, 200, 'Get all car data successfully', cars);
                    }
                }
            }
            catch (error) {
                console.error('Error getting cars:', error);
                (0, responseHandler_1.wrapErrorResponse)(res, 500, 'Internal Server Error');
            }
        });
    }
    getCarById(res, carId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const car = yield carsAdminRepository_1.default.getCarById(carId);
                if (!car) {
                    (0, responseHandler_1.wrapErrorResponse)(res, 404, 'Car with the specified ID not found');
                }
                else {
                    (0, responseHandler_1.wrapResponse)(res, 200, 'Get car data by ID successfully', car);
                }
            }
            catch (error) {
                console.error('Error getting car by ID:', error);
                (0, responseHandler_1.wrapErrorResponse)(res, 500, 'Internal Server Error');
            }
        });
    }
    createCar(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, price, category, startRent, finishRent } = req.body;
            if (!name || !category || !price) {
                throw new Error('Missing required fields: name, category, or price');
            }
            if (isNaN(price) || price <= 0) {
                throw new Error('Price must be a positive number');
            }
            if (!req.file) {
                throw new Error('No image file uploaded');
            }
            if (!req.file.mimetype.startsWith('image/')) {
                throw new Error('Only image files (JPG, PNG, GIF) are allowed');
            }
            const token = req.headers.authorization;
            const username = token ? yield (0, jwtUtils_1.getUsernameFromToken)(token) : 'unknown';
            if (!username) {
                throw new Error('Failed to get username from token');
            }
            const fileBase64 = req.file.buffer.toString('base64');
            const file = `data:${req.file.mimetype};base64,${fileBase64}`;
            return new Promise((resolve, reject) => {
                const uniqueFileName = (0, multer_1.generateUniqueFileName)(file);
                cloudinaryConfig_1.default.uploader.upload(file, { folder: 'challenge_5', public_id: uniqueFileName }, (error, result) => __awaiter(this, void 0, void 0, function* () {
                    if (error) {
                        reject(new Error(error.message));
                        return;
                    }
                    const imageUrl = result.secure_url;
                    try {
                        const newCar = {
                            id: (0, uuid_1.v4)(),
                            name,
                            category,
                            price: parseInt(price, 10),
                            image: imageUrl,
                            startRent: startRent ? new Date(startRent) : null,
                            finishRent: finishRent ? new Date(finishRent) : null,
                            onPublish: false,
                            createdBy: username,
                            updatedBy: username,
                            deletedBy: null,
                            createdAt: new Date(),
                            updatedAt: new Date(),
                        };
                        const createdCar = yield carsAdminRepository_1.default.createCar(newCar);
                        resolve(createdCar);
                    }
                    catch (err) {
                        console.error(err);
                        reject(new Error('Failed to create car'));
                    }
                }));
            });
        });
    }
    updateCar(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const carId = req.params.id;
            const { name, price, category, startRent, finishRent } = req.body;
            try {
                const existingCar = yield carsAdminRepository_1.default.getCarById(carId);
                if (!existingCar) {
                    return null;
                }
                const token = req.headers.authorization;
                const username = token ? yield (0, jwtUtils_1.getUsernameFromToken)(token) : 'unknown';
                if (!username) {
                    throw new Error('Failed to get username from token');
                }
                if (isNaN(price) || price <= 0) {
                    throw new Error('Price must be a positive number');
                }
                if (req.file) {
                    const fileBase64 = req.file.buffer.toString('base64');
                    const file = `data:${req.file.mimetype};base64,${fileBase64}`;
                    const uniqueFileName = (0, multer_1.generateUniqueFileName)(file);
                    const publicId = (0, multer_1.extractPublicId)(existingCar.image);
                    if (publicId) {
                        yield cloudinaryConfig_1.default.uploader.destroy(publicId);
                    }
                    const result = yield cloudinaryConfig_1.default.uploader.upload(file, {
                        folder: 'challenge_5',
                        public_id: uniqueFileName,
                    });
                    existingCar.image = result.secure_url;
                }
                const updatedCar = Object.assign(Object.assign({}, existingCar), { name,
                    price,
                    category, startRent: startRent ? new Date(startRent) : null, finishRent: finishRent ? new Date(finishRent) : null, onPublish: false, updatedBy: username, updatedAt: new Date() });
                const updatedCarResult = yield carsAdminRepository_1.default.updateCar(carId, updatedCar);
                return updatedCarResult;
            }
            catch (error) {
                console.error('Error updating car:', error);
                throw new Error('Internal Server Error');
            }
        });
    }
    deleteCarById(req, res, carId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const car = yield carsAdminRepository_1.default.getCarById(carId);
                if (!car) {
                    (0, responseHandler_1.wrapErrorResponse)(res, 404, 'Car with the specified ID not found');
                    return;
                }
                const token = req.headers.authorization;
                const username = token ? yield (0, jwtUtils_1.getUsernameFromToken)(token) : 'unknown';
                const updatedCar = yield carsAdminRepository_1.default.updateCar(carId, {
                    deletedBy: username,
                    updatedAt: new Date(),
                });
                if (updatedCar) {
                    (0, responseHandler_1.wrapErrorResponse)(res, 200, 'Car deleted successfully');
                }
                else {
                    (0, responseHandler_1.wrapErrorResponse)(res, 400, 'Failed to delete car');
                }
            }
            catch (error) {
                console.error('Error deleting car:', error);
                (0, responseHandler_1.wrapErrorResponse)(res, 500, 'Internal Server Error');
            }
        });
    }
}
exports.default = new CarService();

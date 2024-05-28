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
const uuid_1 = require("uuid");
function seed(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        yield knex.raw('TRUNCATE TABLE cars RESTART IDENTITY');
        yield knex('cars').insert([
            {
                id: (0, uuid_1.v4)(),
                name: 'Nissan Altima',
                category: 'Medium',
                price: 10000,
                image: 'https://res.cloudinary.com/dmuuypm2t/image/upload/v1710400118/img_car_lhk3me.png',
                onPublish: 'true',
                createdBy: 'admin',
                updatedBy: 'admin',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: (0, uuid_1.v4)(),
                name: 'Chevrolet Camaro',
                category: 'Small',
                price: 100.05,
                image: 'https://res.cloudinary.com/dmuuypm2t/image/upload/v1710400118/img_car_lhk3me.png',
                onPublish: 'false',
                createdBy: 'admin',
                updatedBy: 'admin',
                deletedBy: 'firman',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: (0, uuid_1.v4)(),
                name: 'Volkswagen Golf',
                category: 'large',
                price: 20000,
                image: 'https://res.cloudinary.com/dmuuypm2t/image/upload/v1710400118/img_car_lhk3me.png',
                onPublish: 'true',
                createdBy: 'admin',
                updatedBy: 'admin',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: (0, uuid_1.v4)(),
                name: 'Tesla Model S',
                category: 'Small',
                price: 30000,
                image: 'https://res.cloudinary.com/dmuuypm2t/image/upload/v1710400118/img_car_lhk3me.png',
                onPublish: 'false',
                createdBy: 'admin',
                updatedBy: 'admin',
                deletedBy: 'rizki',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: (0, uuid_1.v4)(),
                name: 'BMW X5',
                category: 'large',
                price: 400.05,
                image: 'https://res.cloudinary.com/dmuuypm2t/image/upload/v1710400118/img_car_lhk3me.png',
                onPublish: 'true',
                createdBy: 'admin',
                updatedBy: 'admin',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: (0, uuid_1.v4)(),
                name: 'Audi Q7',
                category: 'small',
                price: 50.05,
                image: 'https://res.cloudinary.com/dmuuypm2t/image/upload/v1710400118/img_car_lhk3me.png',
                onPublish: 'false',
                createdBy: 'admin',
                updatedBy: 'admin',
                startRent: '2012/03/05',
                finishRent: '2012/03/10',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: (0, uuid_1.v4)(),
                name: 'Mercedes-Benz C-Class',
                category: 'large',
                price: 500000,
                image: 'https://res.cloudinary.com/dmuuypm2t/image/upload/v1710400118/img_car_lhk3me.png',
                onPublish: 'true',
                createdBy: 'admin',
                updatedBy: 'admin',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: (0, uuid_1.v4)(),
                name: 'Toyota RAV4',
                category: 'medium',
                price: 30000,
                image: 'https://res.cloudinary.com/dmuuypm2t/image/upload/v1710400118/img_car_lhk3me.png',
                onPublish: 'false',
                createdBy: 'admin',
                updatedBy: 'admin',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: (0, uuid_1.v4)(),
                name: 'Ford F-150',
                category: 'small',
                price: 30000,
                image: 'https://res.cloudinary.com/dmuuypm2t/image/upload/v1710400118/img_car_lhk3me.png',
                onPublish: 'true',
                createdBy: 'admin',
                updatedBy: 'admin',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: (0, uuid_1.v4)(),
                name: 'Honda Accord',
                category: 'small',
                price: 40000,
                image: 'https://res.cloudinary.com/dmuuypm2t/image/upload/v1710400118/img_car_lhk3me.png',
                onPublish: 'false',
                createdBy: 'admin',
                updatedBy: 'admin',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: (0, uuid_1.v4)(),
                name: 'ferrari',
                category: 'large',
                price: 4000000,
                image: 'https://res.cloudinary.com/dmuuypm2t/image/upload/v1710400118/img_car_lhk3me.png',
                onPublish: 'true',
                createdBy: 'admin',
                updatedBy: 'admin',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    });
}
exports.seed = seed;

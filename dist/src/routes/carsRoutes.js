"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carRoutes = void 0;
const express_1 = __importDefault(require("express"));
const carsController_1 = __importDefault(require("../controllers/carsController"));
const multer_1 = __importDefault(require("../middlewares/multer"));
const authMiddlewares_1 = require("../middlewares/authMiddlewares");
const router = express_1.default.Router();
exports.carRoutes = router;
router.get('/cars', authMiddlewares_1.authenticateToken, (0, authMiddlewares_1.authorizeRoles)('2', '3'), carsController_1.default.getAllCars);
router.get('/cars/:id', authMiddlewares_1.authenticateToken, (0, authMiddlewares_1.authorizeRoles)('2', '3'), carsController_1.default.getCarById);
router.post('/cars', authMiddlewares_1.authenticateToken, (0, authMiddlewares_1.authorizeRoles)('2', '3'), multer_1.default.single('image'), carsController_1.default.createCar);
router.put('/cars/:id', authMiddlewares_1.authenticateToken, (0, authMiddlewares_1.authorizeRoles)('2', '3'), multer_1.default.single('image'), carsController_1.default.updateCar);
router.delete('/cars/:id', authMiddlewares_1.authenticateToken, (0, authMiddlewares_1.authorizeRoles)('2', '3'), carsController_1.default.deleteCar);

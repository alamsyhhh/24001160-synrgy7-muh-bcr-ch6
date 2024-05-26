"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const usersController_1 = require("../controllers/usersController");
const authMiddlewares_1 = require("../middlewares/authMiddlewares");
const multer_1 = __importDefault(require("multer"));
const router = express_1.default.Router();
exports.userRoutes = router;
const usersController = new usersController_1.UsersController();
const upload = (0, multer_1.default)();
router.post('/auth/login', upload.none(), usersController.loginUser);
router.post('/users/register', upload.none(), usersController.registerUser);
router.get('/users/current-user', authMiddlewares_1.authenticateToken, usersController.getCurrentUser);
router.get('/cms/users', authMiddlewares_1.authenticateToken, (0, authMiddlewares_1.authorizeRoles)('3'), usersController.getAllUsers);
router.put('/cms/users/:userId/role', authMiddlewares_1.authenticateToken, (0, authMiddlewares_1.authorizeRoles)('3'), upload.none(), usersController.updateUserRole);

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const usersController_1 = require("../controllers/usersController");
const auth_1 = require("../middlewares/auth");
const multer_1 = __importDefault(require("multer"));
const router = express_1.default.Router();
exports.userRoutes = router;
const usersController = new usersController_1.UsersController();
const upload = (0, multer_1.default)();
router.post('/register', upload.none(), usersController.registerUser);
router.post('/login', upload.none(), usersController.loginUser);
router.get('/current-user', auth_1.authenticateToken, usersController.getCurrentUser);
router.get('/users', auth_1.authenticateToken, (0, auth_1.authorizeRoles)('3'), usersController.getAllUsers);
// Menggunakan path parameter (:userId)
router.put('/users/:userId/role', auth_1.authenticateToken, (0, auth_1.authorizeRoles)('3'), upload.none(), usersController.updateUserRole);

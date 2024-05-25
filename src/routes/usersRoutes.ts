import express, { Router } from 'express';
import { UsersController } from '../controllers/usersController';
import { authenticateToken, authorizeRoles } from '../middlewares/auth';
import multer from 'multer';

const router: Router = express.Router();
const usersController = new UsersController();

const upload = multer();

router.post('/register', upload.none(), usersController.registerUser);
router.post('/login', upload.none(), usersController.loginUser);

router.get('/current-user', authenticateToken, usersController.getCurrentUser);

router.get(
  '/users',
  authenticateToken,
  authorizeRoles('3'),
  usersController.getAllUsers
);

// Menggunakan path parameter (:userId)
router.put(
  '/users/:userId/role',
  authenticateToken,
  authorizeRoles('3'),
  upload.none(),
  usersController.updateUserRole
);

export { router as userRoutes };

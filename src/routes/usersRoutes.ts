import express, { Router } from 'express';
import { UsersController } from '../controllers/usersController';
import {
  authenticateToken,
  authorizeRoles,
} from '../middlewares/authMiddlewares';
import multer from 'multer';

const router: Router = express.Router();
const usersController = new UsersController();

const upload = multer();

router.post('/auth/login', upload.none(), usersController.loginUser);
router.post('/users/register', upload.none(), usersController.registerUser);
router.get(
  '/users/current-user',
  authenticateToken,
  usersController.getCurrentUser
);

router.get(
  '/cms/users',
  authenticateToken,
  authorizeRoles('3'),
  usersController.getAllUsers
);

router.put(
  '/cms/users/:userId/role',
  authenticateToken,
  authorizeRoles('3'),
  upload.none(),
  usersController.updateUserRole
);

export { router as userRoutes };

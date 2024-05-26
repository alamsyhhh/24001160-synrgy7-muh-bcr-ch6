import express, { Router } from 'express';
import carController from '../controllers/carsController';
import upload from '../middlewares/multer';
import {
  authenticateToken,
  authorizeRoles,
} from '../middlewares/authMiddlewares';

const router: Router = express.Router();

router.get(
  '/cars',
  authenticateToken,
  authorizeRoles('2', '3'),
  carController.getAllCars
);
router.get(
  '/cars/:id',
  authenticateToken,
  authorizeRoles('2', '3'),
  carController.getCarById
);
router.post(
  '/cars',
  authenticateToken,
  authorizeRoles('2', '3'),
  upload.single('image'),
  carController.createCar
);
router.put(
  '/cars/:id',
  authenticateToken,
  authorizeRoles('2', '3'),
  upload.single('image'),
  carController.updateCar
);
router.delete(
  '/cars/:id',
  authenticateToken,
  authorizeRoles('2', '3'),
  carController.deleteCar
);

export { router as carRoutes };

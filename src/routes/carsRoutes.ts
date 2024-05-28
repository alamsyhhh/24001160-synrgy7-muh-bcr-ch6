import express, { Router } from 'express';
import carsAdminController from '../controllers/cars/carsAdminController';
import carsUsersController from '../controllers/cars/carsUsersController';
import upload from '../middlewares/multer';
import {
  authenticateToken,
  authorizeRoles,
} from '../middlewares/authMiddlewares';

const router: Router = express.Router();

router.get('/cars', carsUsersController.getAllCars);
router.get('/cars/:id', carsUsersController.getCarById);

router.get(
  '/cms/cars',
  authenticateToken,
  authorizeRoles('2', '3'),
  carsAdminController.getAllCars
);
router.get(
  '/cms/cars/:id',
  authenticateToken,
  authorizeRoles('2', '3'),
  carsAdminController.getCarById
);
router.post(
  '/cms/cars',
  authenticateToken,
  authorizeRoles('2', '3'),
  upload.single('image'),
  carsAdminController.createCar
);
router.put(
  '/cms/cars/:id',
  authenticateToken,
  authorizeRoles('2', '3'),
  upload.single('image'),
  carsAdminController.updateCar
);
router.delete(
  '/cms/cars/:id',
  authenticateToken,
  authorizeRoles('2', '3'),
  carsAdminController.deleteCar
);

export { router as carRoutes };

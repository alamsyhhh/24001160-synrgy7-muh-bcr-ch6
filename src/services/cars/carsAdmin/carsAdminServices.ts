import { Request, Response } from 'express';
import { CarDTO } from '../../../dto/cars/carsDto';

import { ICarService } from './carsAdminServiceInterface';
import {
  wrapResponse,
  wrapErrorResponse,
} from '../../../utils/responseHandler';
import { v4 as uuidv4 } from 'uuid';
import cloudinary from '../../../../config/cloudinaryConfig';
import { getUsernameFromToken } from '../../../utils/jwtUtils';

import {
  generateUniqueFileName,
  extractPublicId,
} from '../../../middlewares/multer';
import carsRepository from '../../../repositories/cars/carsAdmin/carsAdminRepository';

class CarService implements ICarService {
  async getAllCars(
    res: Response,
    category?: string,
    name?: string,
    page: number = 1,
    pageSize: number = -1
  ): Promise<void> {
    try {
      let cars: CarDTO[];
      if (category || name || pageSize !== -1) {
        cars = await carsRepository.getAllCars(category, name, page, pageSize);
        if (cars.length === 0) {
          wrapErrorResponse(
            res,
            404,
            'No cars found with the specified criteria'
          );
          return;
        }

        const totalCount = await carsRepository.getTotalCount(category, name);
        const totalPages =
          pageSize !== -1 ? Math.ceil(totalCount / pageSize) : 1;

        wrapResponse(res, 200, 'Get all car data successfully', {
          data: cars,
          totalPages,
        });
      } else {
        cars = await carsRepository.getAllCars();
        if (cars.length === 0) {
          wrapErrorResponse(res, 404, 'No cars found');
        } else {
          wrapResponse(res, 200, 'Get all car data successfully', cars);
        }
      }
    } catch (error) {
      console.error('Error getting cars:', error);
      wrapErrorResponse(res, 500, 'Internal Server Error');
    }
  }

  async getCarById(res: Response, carId: string): Promise<void> {
    try {
      const car = await carsRepository.getCarById(carId);
      if (!car) {
        wrapErrorResponse(res, 404, 'Car with the specified ID not found');
      } else {
        wrapResponse(res, 200, 'Get car data by ID successfully', car);
      }
    } catch (error) {
      console.error('Error getting car by ID:', error);
      wrapErrorResponse(res, 500, 'Internal Server Error');
    }
  }

  async createCar(req: Request): Promise<CarDTO | null> {
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
    const username = token ? await getUsernameFromToken(token) : 'unknown';

    if (!username) {
      throw new Error('Failed to get username from token');
    }

    const fileBase64 = req.file.buffer.toString('base64');
    const file = `data:${req.file.mimetype};base64,${fileBase64}`;

    return new Promise((resolve, reject) => {
      const uniqueFileName = generateUniqueFileName(file);

      cloudinary.uploader.upload(
        file,
        { folder: 'challenge_5', public_id: uniqueFileName },
        async (error, result: any) => {
          if (error) {
            reject(new Error(error.message));
            return;
          }

          const imageUrl = result.secure_url;

          try {
            const newCar: CarDTO = {
              id: uuidv4(),
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

            const createdCar = await carsRepository.createCar(newCar);
            resolve(createdCar);
          } catch (err) {
            console.error(err);
            reject(new Error('Failed to create car'));
          }
        }
      );
    });
  }

  async updateCar(req: Request): Promise<CarDTO | null> {
    const carId = req.params.id;
    const { name, price, category, startRent, finishRent } = req.body;

    try {
      const existingCar = await carsRepository.getCarById(carId);
      if (!existingCar) {
        return null;
      }

      const token = req.headers.authorization;
      const username = token ? await getUsernameFromToken(token) : 'unknown';

      if (!username) {
        throw new Error('Failed to get username from token');
      }

      if (isNaN(price) || price <= 0) {
        throw new Error('Price must be a positive number');
      }

      if (req.file) {
        const fileBase64 = req.file.buffer.toString('base64');
        const file = `data:${req.file.mimetype};base64,${fileBase64}`;

        const uniqueFileName = generateUniqueFileName(file);

        const publicId = extractPublicId(existingCar.image);
        if (publicId) {
          await cloudinary.uploader.destroy(publicId);
        }

        const result = await cloudinary.uploader.upload(file, {
          folder: 'challenge_5',
          public_id: uniqueFileName,
        });

        existingCar.image = result.secure_url;
      }

      const updatedCar: CarDTO = {
        ...existingCar,
        name,
        price,
        category,
        startRent: startRent ? new Date(startRent) : null,
        finishRent: finishRent ? new Date(finishRent) : null,
        onPublish: false,
        updatedBy: username,
        updatedAt: new Date(),
      };

      const updatedCarResult = await carsRepository.updateCar(
        carId,
        updatedCar
      );
      return updatedCarResult;
    } catch (error) {
      console.error('Error updating car:', error);
      throw new Error('Internal Server Error');
    }
  }

  async deleteCarById(
    req: Request,
    res: Response,
    carId: string
  ): Promise<void> {
    try {
      const car = await carsRepository.getCarById(carId);
      if (!car) {
        wrapErrorResponse(res, 404, 'Car with the specified ID not found');
        return;
      }

      const token = req.headers.authorization;
      const username = token ? await getUsernameFromToken(token) : 'unknown';

      const updatedCar = await carsRepository.updateCar(carId, {
        deletedBy: username,
        updatedAt: new Date(),
      });

      if (updatedCar) {
        wrapErrorResponse(res, 200, 'Car deleted successfully');
      } else {
        wrapErrorResponse(res, 400, 'Failed to delete car');
      }
    } catch (error) {
      console.error('Error deleting car:', error);
      wrapErrorResponse(res, 500, 'Internal Server Error');
    }
  }
}

export default new CarService();

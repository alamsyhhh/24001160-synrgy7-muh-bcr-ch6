import { Request, Response } from 'express';
import carService from '../services/cars/carsServices';
import { wrapResponse, wrapErrorResponse } from '../utils/responseHandler';

class CarController {
  async getAllCars(req: Request, res: Response): Promise<void> {
    try {
      const category = req.query.category as string | undefined;
      const name = req.query.name as string | undefined;
      const page = parseInt(req.query.page as string) || 1;
      const pageSize = parseInt(req.query.pageSize as string) || -1;
      await carService.getAllCars(res, category, name, page, pageSize);
    } catch (error) {
      console.error('Error getting cars:', error);
      wrapErrorResponse(res, 500, 'Internal Server Error');
    }
  }

  async getCarById(req: Request, res: Response): Promise<void> {
    const carId = req.params.id;
    carService.getCarById(res, carId);
  }

  async createCar(req: Request, res: Response): Promise<void> {
    try {
      const newCar = await carService.createCar(req);
      if (newCar) {
        wrapResponse(res, 201, 'Data Berhasil Disimpan', newCar);
      } else {
        wrapResponse(res, 500, 'Failed to create car', newCar);
      }
    } catch (error) {
      console.error(error);
      wrapErrorResponse(res, 500, 'Internal Server Error');
    }
  }

  async updateCar(req: Request, res: Response): Promise<void> {
    try {
      const updatedCar = await carService.updateCar(req);
      if (updatedCar) {
        wrapResponse(res, 200, 'Car updated successfully', updatedCar);
      } else {
        wrapErrorResponse(res, 404, 'Car with the specified ID not found');
      }
    } catch (error) {
      console.error(error);
      wrapErrorResponse(res, 500, 'Internal Server Error');
    }
  }

  async deleteCar(req: Request, res: Response): Promise<void> {
    const carId = req.params.id;
    carService.deleteCarById(req, res, carId);
  }
}

export default new CarController();

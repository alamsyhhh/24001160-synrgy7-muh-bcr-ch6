import { Request, Response } from 'express';
import CarsUsersService from '../../services/cars/carsUsers/carsUsersService';
import { wrapErrorResponse, wrapResponse } from '../../utils/responseHandler';
import CarsUsersRepository from '../../repositories/cars/carsUsers/carsUsersRepositories';

class CarsUsersController {
  private carsUsersService: CarsUsersService;
  constructor() {
    this.carsUsersService = new CarsUsersService(CarsUsersRepository);
    this.getAllCars = this.getAllCars.bind(this);
    this.getCarById = this.getCarById.bind(this);
  }

  async getAllCars(req: Request, res: Response): Promise<void> {
    try {
      const { category, name, page, pageSize } = req.query;
      const result = await this.carsUsersService.getAllCars(
        category as string,
        name as string,
        page ? parseInt(page as string) : undefined,
        pageSize ? parseInt(pageSize as string) : undefined
      );
      wrapResponse(res, 200, 'Cars fetched successfully', result);
    } catch (error) {
      wrapErrorResponse(res, 500, 'Internal Server Error');
      console.log(error);
    }
  }

  async getCarById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const car = await this.carsUsersService.getCarById(id);
      if (car) {
        wrapResponse(res, 200, 'Car fetched successfully', car);
      } else {
        wrapErrorResponse(res, 404, 'Car not found');
      }
    } catch (error) {
      wrapErrorResponse(res, 500, 'Internal Server Error');
    }
  }
}

export default new CarsUsersController();

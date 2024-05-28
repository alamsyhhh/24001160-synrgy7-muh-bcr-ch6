import { Request, Response } from 'express';
import { CarDTO } from '../../../dto/cars/carsDto';

export interface ICarService {
  getAllCars(
    res: Response,
    category?: string,
    name?: string,
    page?: number,
    pageSize?: number
  ): Promise<void>;
  getCarById(res: Response, carId: string): Promise<void>;
  createCar(req: Request): Promise<CarDTO | null>;
  updateCar(req: Request): Promise<CarDTO | null>;
  deleteCarById(req: Request, res: Response, carId: string): Promise<void>;
}

import { Request, Response } from 'express';
import { Cars } from '../../db/models/carsModel';

export interface ICarService {
  getAllCars(
    res: Response,
    category?: string,
    name?: string,
    page?: number,
    pageSize?: number
  ): Promise<void>;
  getCarById(res: Response, carId: string): Promise<void>;
  createCar(req: Request): Promise<Cars | null>;
  updateCar(req: Request): Promise<Cars | null>;
  deleteCarById(req: Request, res: Response, carId: string): Promise<void>;
}

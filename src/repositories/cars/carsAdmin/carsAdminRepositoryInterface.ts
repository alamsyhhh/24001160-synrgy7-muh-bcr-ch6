import { Cars } from '../../../db/models/carsModel';

export interface ICarRepository {
  getAllCars(
    category?: string,
    name?: string,
    page?: number,
    pageSize?: number
  ): Promise<Cars[]>;
  getCarById(carId: string): Promise<Cars | undefined>;
  createCar(carData: Partial<Cars>): Promise<Cars>;
  updateCar(carId: string, carData: Partial<Cars>): Promise<Cars>;
  deleteCarById(carId: string): Promise<number>;
  getTotalCount(): Promise<number>;
}

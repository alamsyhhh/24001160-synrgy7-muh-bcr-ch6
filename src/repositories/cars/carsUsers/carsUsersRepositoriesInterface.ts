import { CarUsersDTO } from '../../../dto/cars/carsUsersDto';

export interface CarsUsersRepositoryInterface {
  getAllCars(
    category?: string,
    name?: string,
    page?: number,
    pageSize?: number
  ): Promise<CarUsersDTO[]>;

  getCarById(carId: string): Promise<CarUsersDTO | undefined>;

  getTotalCount(category?: string, name?: string): Promise<number>;
}

import { CarUsersDTO } from '../../../dto/cars/carsUsersDto';

export interface CarsUsersServiceInterface {
  getAllCars(
    category?: string,
    name?: string,
    page?: number,
    pageSize?: number
  ): Promise<CarResponse>;

  getCarById(carId: string): Promise<CarUsersDTO | undefined>;
}

interface CarResponse {
  data: CarUsersDTO[];
  totalPages: number;
}

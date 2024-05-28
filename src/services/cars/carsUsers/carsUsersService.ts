// carsUsersService.ts
import { CarsUsersRepositoryInterface } from '../../../repositories/cars/carsUsers/carsUsersRepositoriesInterface';
import { CarsUsersServiceInterface } from './carsUsersServicesInterface';
import { CarUsersDTO } from '../../../dto/cars/carsUsersDto';

interface CarResponse {
  data: CarUsersDTO[];
  totalPages: number;
}

class CarsUsersService implements CarsUsersServiceInterface {
  constructor(private repository: CarsUsersRepositoryInterface) {}

  async getAllCars(
    category?: string,
    name?: string,
    page?: number,
    pageSize: number = 10
  ): Promise<CarResponse> {
    const totalCount = await this.repository.getTotalCount(category, name);
    const totalPages = pageSize !== -1 ? Math.ceil(totalCount / pageSize) : 1;
    const cars = await this.repository.getAllCars(
      category,
      name,
      page,
      pageSize
    );

    return {
      data: cars,
      totalPages,
    };
  }

  async getCarById(carId: string): Promise<CarUsersDTO | undefined> {
    return this.repository.getCarById(carId);
  }
}

export default CarsUsersService;

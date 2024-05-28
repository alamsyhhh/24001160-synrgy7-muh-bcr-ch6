import { CarsModel } from '../../../db/models/carsModel';
import { ICarRepository } from './carsAdminRepositoryInterface';
import { CarDTO } from '../../../dto/cars/carsDto';

class CarRepository implements ICarRepository {
  async getAllCars(
    category?: string,
    name?: string,
    page?: number,
    pageSize?: number
  ): Promise<CarDTO[]> {
    const query = CarsModel.query();

    if (category) {
      const categoryLowerCase = category.toLowerCase();
      query.whereRaw('LOWER(category) = ?', [categoryLowerCase]);
    }

    if (name) {
      const nameLowerCase = name.toLowerCase();
      query.whereRaw('LOWER(name) LIKE ?', [`%${nameLowerCase}%`]);
    }

    if (pageSize && pageSize !== -1) {
      const offset = (page ? page - 1 : 0) * pageSize;
      query.offset(offset).limit(pageSize);
    }

    const cars = await query;
    return cars.map((car) => car as CarDTO);
  }

  async getCarById(carId: string): Promise<CarDTO | undefined> {
    const car = await CarsModel.query().findById(carId);
    return car ? (car as CarDTO) : undefined;
  }

  async createCar(carData: Partial<CarDTO>): Promise<CarDTO> {
    const newCar = await CarsModel.query().insert(carData);
    return newCar as CarDTO;
  }

  async updateCar(carId: string, carData: Partial<CarDTO>): Promise<CarDTO> {
    const updatedCar = await CarsModel.query().patchAndFetchById(
      carId,
      carData
    );
    return updatedCar as CarDTO;
  }

  async deleteCarById(carId: string): Promise<number> {
    return CarsModel.query().deleteById(carId);
  }

  async getTotalCount(category?: string, name?: string): Promise<number> {
    const query = CarsModel.query();

    if (category) {
      const categoryLowerCase = category.toLowerCase();
      query.whereRaw('LOWER(category) = ?', [categoryLowerCase]);
    }

    if (name) {
      const nameLowerCase = name.toLowerCase();
      query.whereRaw('LOWER(name) LIKE ?', [`%${nameLowerCase}%`]);
    }

    return query.resultSize();
  }
}

export default new CarRepository();

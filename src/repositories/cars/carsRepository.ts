import { CarsModel, Cars } from '../../db/models/carsModel';
import { ICarRepository } from './carsRepositoryInterface';
import { CarDTO } from '../../dto/cars/carsDto';

class CarRepository implements ICarRepository {
  async getAllCars(
    category?: string,
    name?: string,
    page?: number,
    pageSize?: number
  ): Promise<CarDTO[]> {
    const query = CarsModel.query().whereNull('deletedBy');

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

    return query;
  }

  async getCarById(carId: string): Promise<CarDTO | undefined> {
    return CarsModel.query().findById(carId);
  }

  async createCar(carData: Partial<CarDTO>): Promise<CarDTO> {
    return CarsModel.query().insert(carData);
  }

  async updateCar(carId: string, carData: Partial<CarDTO>): Promise<CarDTO> {
    return CarsModel.query().patchAndFetchById(carId, carData);
  }

  async deleteCarById(carId: string): Promise<number> {
    return CarsModel.query().deleteById(carId);
  }

  async getTotalCount(category?: string, name?: string): Promise<number> {
    const query = CarsModel.query().whereNull('deletedBy');

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

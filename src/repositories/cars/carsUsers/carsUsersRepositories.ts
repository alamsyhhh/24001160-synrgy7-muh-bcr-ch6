// carsUsersRepositories.ts
import { CarsUsersRepositoryInterface } from './carsUsersRepositoriesInterface';
import { CarUsersDTO } from '../../../dto/cars/carsUsersDto';
import { CarsModel } from '../../../db/models/carsModel';

class CarsUsersRepository implements CarsUsersRepositoryInterface {
  async getAllCars(
    category?: string,
    name?: string,
    page?: number,
    pageSize?: number
  ): Promise<CarUsersDTO[]> {
    const query = CarsModel.query()
      .whereNull('deletedBy')
      .andWhere('onPublish', true);

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

    return cars.map((car) => ({
      id: car.id,
      name: car.name,
      category: car.category,
      price: car.price,
      image: car.image,
      startRent: car.startRent,
      finishRent: car.finishRent,
    }));
  }

  async getCarById(carId: string): Promise<CarUsersDTO | undefined> {
    const car = await CarsModel.query()
      .findById(carId)
      .whereNull('deletedBy')
      .andWhere('onPublish', true);

    if (!car) return undefined;

    return {
      id: car.id,
      name: car.name,
      category: car.category,
      price: car.price,
      image: car.image,
      startRent: car.startRent,
      finishRent: car.finishRent,
    };
  }

  async getTotalCount(category?: string, name?: string): Promise<number> {
    const query = CarsModel.query()
      .whereNull('deletedBy')
      .andWhere('onPublish', true);

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

export default new CarsUsersRepository();

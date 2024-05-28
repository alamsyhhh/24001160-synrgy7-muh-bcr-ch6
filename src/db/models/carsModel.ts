import { Model, ModelObject } from 'objection';

export class CarsModel extends Model {
  id!: string;
  name!: string;
  category!: string;
  price!: number;
  image!: string;
  startRent?: Date | null;
  finishRent?: Date | null;
  onPublish: boolean = false;
  createdBy!: string;
  updatedBy!: string;
  deletedBy?: string | null;
  createdAt!: Date;
  updatedAt!: Date;

  static get tableName() {
    return 'cars';
  }
}

export type Cars = ModelObject<CarsModel>;

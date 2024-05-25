import { Model, ModelObject } from 'objection';
import { RolesModel } from './rolesModel';

export class UsersModel extends Model {
  id!: string;
  username!: string;
  email!: string;
  password!: string;
  roleId!: string;
  createdAt!: Date;
  updatedAt!: Date;

  static get tableName() {
    return 'users';
  }

  static get relationMappings() {
    return {
      role: {
        relation: Model.BelongsToOneRelation,
        modelClass: RolesModel,
        join: {
          from: 'users.role_id',
          to: 'roles.id',
        },
      },
    };
  }
}

export type Users = ModelObject<UsersModel>;

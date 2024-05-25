import { Model, ModelObject } from 'objection';
import { UsersModel } from './usersModel';

export class RolesModel extends Model {
  id!: string;
  userRole!: string;
  static userRole: any;

  static get tableName() {
    return 'roles';
  }

  static get relationMappings() {
    return {
      users: {
        relation: Model.HasManyRelation,
        modelClass: UsersModel,
        join: {
          from: 'roles.id',
          to: 'users.role_id',
        },
      },
    };
  }
}

export type Roles = ModelObject<RolesModel>;

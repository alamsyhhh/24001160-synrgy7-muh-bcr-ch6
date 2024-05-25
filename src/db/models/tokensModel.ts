import { Model, ModelObject } from 'objection';
import { UsersModel } from './usersModel';

export class TokensModel extends Model {
  id!: string;
  token!: string;
  userId!: string;

  static get tableName() {
    return 'tokens';
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: UsersModel,
        join: {
          from: 'tokens.user_id', // Change userId to user_id
          to: 'users.id',
        },
      },
    };
  }
}

export type Tokens = ModelObject<TokensModel>;

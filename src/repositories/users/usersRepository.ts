// src/repositories/usersRepository.ts

import { IUsersRepository } from './usersRepositoryInterface';
import { UsersModel } from '../../db/models/usersModel';
import { TokensModel } from '../../db/models/tokensModel';

export class UsersRepository implements IUsersRepository {
  async findById(id: string): Promise<UsersModel | undefined> {
    return UsersModel.query().findById(id);
  }

  async findByEmail(email: string): Promise<UsersModel | undefined> {
    return UsersModel.query().findOne({ email });
  }

  async insertUser(user: Partial<UsersModel>): Promise<UsersModel> {
    return UsersModel.query().insert(user);
  }

  async insertToken(token: Partial<TokensModel>): Promise<void> {
    await TokensModel.query().insert(token);
  }

  async updateUserRole(userId: string, newRoleId: string): Promise<UsersModel> {
    return UsersModel.query().patchAndFetchById(userId, { roleId: newRoleId });
  }
}

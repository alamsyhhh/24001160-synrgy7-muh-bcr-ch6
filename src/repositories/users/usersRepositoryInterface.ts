// src/repositories/IUsersRepository.ts

import { UsersModel } from '../../db/models/usersModel';
import { TokensModel } from '../../db/models/tokensModel';

export interface IUsersRepository {
  findById(id: string): Promise<UsersModel | undefined>;
  findByEmail(email: string): Promise<UsersModel | undefined>;
  insertUser(user: Partial<UsersModel>): Promise<UsersModel>;
  insertToken(token: Partial<TokensModel>): Promise<void>;
  updateUserRole(userId: string, newRoleId: string): Promise<UsersModel>;
}

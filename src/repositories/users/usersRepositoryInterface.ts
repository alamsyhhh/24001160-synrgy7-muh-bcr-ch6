import { UsersModel } from '../../db/models/usersModel';

export interface IUsersRepository {
  findById(id: string): Promise<UsersModel | undefined>;
  findRoleById(roleId: string): Promise<{ userRole: string } | undefined>;
  findByEmail(email: string): Promise<UsersModel | undefined>;
  insertUser(user: Partial<UsersModel>): Promise<UsersModel>;
  findAllUsersWithRoles(): Promise<
    (UsersModel & { role?: { userRole: string } })[]
  >;
  updateUserRole(userId: string, newRoleId: string): Promise<UsersModel>;
}

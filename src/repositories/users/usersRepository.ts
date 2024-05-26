import { IUsersRepository } from './usersRepositoryInterface';
import { UsersModel } from '../../db/models/usersModel';
import { RolesModel } from '../../db/models/rolesModel';

export class UsersRepository implements IUsersRepository {
  async findById(id: string): Promise<UsersModel | undefined> {
    return UsersModel.query().findById(id);
  }

  async findRoleById(
    roleId: string
  ): Promise<{ userRole: string } | undefined> {
    return RolesModel.query().findById(roleId);
  }

  async findByEmail(email: string): Promise<UsersModel | undefined> {
    return UsersModel.query().findOne({ email });
  }

  async insertUser(user: Partial<UsersModel>): Promise<UsersModel> {
    return UsersModel.query().insert(user);
  }

  async findAllUsersWithRoles(): Promise<
    (UsersModel & { role?: { userRole: string } })[]
  > {
    const users = await UsersModel.query();
    const usersWithRoles = await Promise.all(
      users.map(async (user: any) => {
        const role = await RolesModel.query().findById(user.roleId);
        return { ...user, role: { userRole: role?.userRole ?? '' } };
      })
    );
    return usersWithRoles;
  }

  async updateUserRole(userId: string, newRoleId: string): Promise<UsersModel> {
    return UsersModel.query().patchAndFetchById(userId, { roleId: newRoleId });
  }
}

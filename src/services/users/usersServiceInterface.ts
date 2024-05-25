import { UserDto } from '../../dto/users/usersDto';
import { UserCurrentDto } from '../../dto/users/usersCurrentDto';

export interface IUsersService {
  registerUser(
    username: string,
    email: string,
    password: string
  ): Promise<UserDto>;
  loginUser(
    email: string,
    password: string
  ): Promise<{ user: UserDto; token: string }>;
  getAllUsers(): Promise<UserCurrentDto[]>;
  updateUserRole(userId: string, newRoleId: string): Promise<UserDto>;
  getCurrentUser(userId: string): Promise<UserDto>;
}

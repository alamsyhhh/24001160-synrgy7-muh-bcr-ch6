import { UserDto } from '../../dto/users/usersDto';
import { UserCurrentDto } from '../../dto/users/usersCurrentDto';

export interface IUsersService {
  registerUser(
    username: string,
    email: string,
    password: string
  ): Promise<void>;
  loginUser(
    email: string,
    password: string
  ): Promise<{ user: UserDto; token: string }>;
  getAllUsers(): Promise<UserCurrentDto[]>;
  updateUserRole(userId: string, newRoleId: string): Promise<void>;
  getCurrentUser(userId: string): Promise<UserDto>;
}

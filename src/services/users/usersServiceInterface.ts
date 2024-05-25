// src/services/users/IUsersService.ts

import { UserDto } from '../../dto/users/usersDto';

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
  updateUserRole(userId: string, newRoleId: string): Promise<UserDto>;
  getCurrentUser(userId: string): Promise<UserDto>;
}

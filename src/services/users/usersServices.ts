import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { ValidationError } from 'objection';
import {
  validateUserInput,
  validateLoginInput,
} from '../../utils/usersValidators';
import { generateToken } from '../../utils/jwtUtils';
import { UserDto } from '../../dto/users/usersDto';
import { IUsersRepository } from '../../repositories/users/usersRepositoryInterface';
import { IUsersService } from './usersServiceInterface';
import { UserCurrentDto } from '../../dto/users/usersCurrentDto';
import { RolesModel } from '../../db/models/rolesModel';

export class UsersService implements IUsersService {
  constructor(
    private usersRepository: IUsersRepository,
    private hashPassword: (password: string) => Promise<string>,
    private comparePassword: (
      password: string,
      hashedPassword: string
    ) => Promise<boolean>
  ) {}

  async registerUser(
    username: string,
    email: string,
    password: string
  ): Promise<void> {
    validateUserInput(username, email, password);

    const existingUser = await this.usersRepository.findByEmail(email);
    if (existingUser) {
      throw new ValidationError({
        type: 'ModelValidation',
        message: 'Email already registered',
      });
    }

    const hashedPassword = await this.hashPassword(password);

    await this.usersRepository.insertUser({
      id: uuidv4(),
      username,
      email,
      password: hashedPassword,
      roleId: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  async loginUser(
    email: string,
    password: string
  ): Promise<{ user: UserDto; token: string }> {
    validateLoginInput(email, password);

    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new ValidationError({
        type: 'ModelValidation',
        message: 'Invalid email or password',
      });
    }

    const passwordMatch = await this.comparePassword(password, user.password);
    if (!passwordMatch) {
      throw new ValidationError({
        type: 'ModelValidation',
        message: 'Invalid email or password',
      });
    }

    const token = generateToken(user.id);

    return { user: new UserDto(user.username), token };
  }

  async getCurrentUser(userId: string): Promise<UserDto> {
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new ValidationError({
        type: 'ModelValidation',
        message: 'User not found',
      });
    }

    const role = await this.usersRepository.findRoleById(user.roleId);

    return new UserCurrentDto(user.id, user.username, role?.userRole ?? '');
  }

  async getAllUsers(): Promise<UserCurrentDto[]> {
    const users = await this.usersRepository.findAllUsersWithRoles();
    const usersWithRoles = users.map(
      (user) =>
        new UserCurrentDto(user.id, user.username, user.role?.userRole ?? '')
    );
    return usersWithRoles;
  }

  async updateUserRole(userId: string, newRoleId: string): Promise<UserDto> {
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new ValidationError({
        type: 'ModelValidation',
        message: 'User not found',
      });
    }

    if (newRoleId !== '2') {
      throw new ValidationError({
        type: 'ModelValidation',
        message: 'Cannot update user role to super admin',
      });
    }

    if (user.roleId === '3') {
      throw new ValidationError({
        type: 'ModelValidation',
        message: 'Cannot update super admin role',
      });
    }

    const updatedUser = await this.usersRepository.updateUserRole(
      userId,
      newRoleId
    );
    return new UserDto(updatedUser.username);
  }
}

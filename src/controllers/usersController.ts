import { Request, Response } from 'express';
import { wrapErrorResponse, wrapResponse } from '../utils/responseHandler';
import { AuthenticatedRequest } from '../middlewares/auth';
import { UsersService } from '../services/users/usersServices';
import { UsersRepository } from '../repositories/users/usersRepository';
import { ValidationError } from 'objection';

export class UsersController {
  private usersService: UsersService;

  constructor() {
    const usersRepository = new UsersRepository();
    this.usersService = new UsersService(usersRepository);

    this.registerUser = this.registerUser.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.updateUserRole = this.updateUserRole.bind(this);
    this.getCurrentUser = this.getCurrentUser.bind(this);
    this.getAllUsers = this.getAllUsers.bind(this);
  }

  async registerUser(req: Request, res: Response): Promise<void> {
    const { username, email, password } = req.body;
    try {
      const userDto = await this.usersService.registerUser(
        username,
        email,
        password
      );
      wrapResponse(res, 201, 'Register Success', userDto);
    } catch (error) {
      console.error('Error registering user:', error);
      if (error instanceof ValidationError) {
        wrapErrorResponse(res, 400, error.message);
      } else if (error instanceof Error) {
        wrapErrorResponse(res, 500, error.message);
      } else {
        wrapErrorResponse(res, 500, 'Internal server error');
      }
    }
  }

  async loginUser(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    try {
      const result = await this.usersService.loginUser(email, password);
      wrapResponse(res, 200, 'Login Success', result);
    } catch (error) {
      console.error('Error logging in user:', error);
      if (error instanceof ValidationError) {
        wrapErrorResponse(res, 400, error.message);
      } else if (error instanceof Error) {
        wrapErrorResponse(res, 500, error.message);
      } else {
        wrapErrorResponse(res, 500, 'Internal server error');
      }
    }
  }

  async getCurrentUser(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      const user = req.user;
      if (user) {
        const userDto = await this.usersService.getCurrentUser(user.id);
        wrapResponse(res, 200, 'User fetched successfully', { user: userDto });
      } else {
        wrapErrorResponse(res, 404, 'User not found');
      }
    } catch (error) {
      console.error('Error fetching current user:', error);
      if (error instanceof Error) {
        wrapErrorResponse(res, 500, error.message);
      } else {
        wrapErrorResponse(res, 500, 'Internal server error');
      }
    }
  }

  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.usersService.getAllUsers();
      wrapResponse(res, 200, 'Users fetched successfully', users);
    } catch (error) {
      console.error('Error fetching all users:', error);
      if (error instanceof Error) {
        wrapErrorResponse(res, 500, error.message);
      } else {
        wrapErrorResponse(res, 500, 'Internal server error');
      }
    }
  }

  async updateUserRole(req: Request, res: Response): Promise<void> {
    const { userId } = req.params;
    const { newRoleId } = req.body;
    try {
      const userDto = await this.usersService.updateUserRole(userId, newRoleId);
      wrapResponse(res, 200, 'User role updated successfully', userDto);
    } catch (error) {
      console.error('Error updating user role:', error);
      if (error instanceof ValidationError) {
        wrapErrorResponse(res, 400, error.message);
      } else if (error instanceof Error) {
        wrapErrorResponse(res, 500, error.message);
      } else {
        wrapErrorResponse(res, 500, 'Internal server error');
      }
    }
  }
}

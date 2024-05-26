// UsersController.ts
import { Request, Response } from 'express';
import {
  wrapResponse,
  wrapErrorResponse,
  handleNotFoundError,
  handleInternalServerError,
  handleBadRequestError,
} from '../utils/responseHandler';
import { AuthenticatedRequest } from '../middlewares/authMiddlewares';
import { UsersService } from '../services/users/usersServices';
import { UsersRepository } from '../repositories/users/usersRepository';
import { ValidationError } from 'objection';
import { hashPassword, comparePassword } from '../utils/bcryptUtils';

export class UsersController {
  private usersService: UsersService;

  constructor() {
    const usersRepository = new UsersRepository();
    this.usersService = new UsersService(
      usersRepository,
      hashPassword,
      comparePassword
    );

    this.registerUser = this.registerUser.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.updateUserRole = this.updateUserRole.bind(this);
    this.getCurrentUser = this.getCurrentUser.bind(this);
    this.getAllUsers = this.getAllUsers.bind(this);
  }

  async registerUser(req: Request, res: Response): Promise<void> {
    const { username, email, password } = req.body;
    try {
      await this.usersService.registerUser(username, email, password);
      wrapErrorResponse(res, 201, 'Register Success');
    } catch (error) {
      console.error('Error registering user:', error);
      if (error instanceof ValidationError) {
        handleBadRequestError(res, error.message);
      } else {
        handleInternalServerError(res, 'Internal Server Error');
      }
    }
  }

  async loginUser(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    try {
      const result = await this.usersService.loginUser(email, password);
      wrapResponse(res, 200, 'Login Success', result);
    } catch (error) {
      // console.error('Error logging in user:', error);
      if (error instanceof ValidationError) {
        wrapErrorResponse(res, 400, error.message);
      } else {
        handleInternalServerError(res, 'Internal Server Error');
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
        handleNotFoundError(res, 'User not found');
      }
    } catch (error) {
      console.error('Error fetching current user:', error);
      handleInternalServerError(res, 'Internal Server Error');
    }
  }

  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.usersService.getAllUsers();
      wrapResponse(res, 200, 'Users fetched successfully', users);
    } catch (error) {
      console.error('Error fetching all users:', error);
      handleInternalServerError(res, 'Internal Server Error');
    }
  }

  async updateUserRole(req: Request, res: Response): Promise<void> {
    const { userId } = req.params;
    const { newRoleId } = req.body;
    try {
      await this.usersService.updateUserRole(userId, newRoleId);
      wrapErrorResponse(res, 200, 'User role updated successfully');
    } catch (error) {
      console.error('Error updating user role:', error);
      if (error instanceof ValidationError) {
        wrapErrorResponse(res, 400, error.message);
      } else {
        handleInternalServerError(res, 'Internal Server Error');
      }
    }
  }
}

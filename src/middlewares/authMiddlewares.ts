import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UsersModel } from '../db/models/usersModel';
import dotenv from 'dotenv';
import { handleErrorResponse } from '../utils/responseHandler';

dotenv.config();

export interface AuthenticatedRequest extends Request {
  user?: UsersModel;
}

interface DecodedToken extends JwtPayload {
  id: string;
}

export const authenticateToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return handleErrorResponse(res, 401, 'Access Token Required');
  }

  const token = authHeader.split(' ')[1].trim();

  try {
    const secretKey = process.env.JWT_SECRET as string;
    if (!secretKey) {
      throw new Error('JWT_SECRET is not defined');
    }

    const decoded = jwt.verify(token, secretKey) as DecodedToken;

    if (!decoded.id) {
      throw new Error('Token does not contain user ID');
    }

    const user = await UsersModel.query().findById(decoded.id);

    if (!user) {
      return handleErrorResponse(res, 404, 'User not found');
    }

    req.user = user;
    next();
  } catch (err) {
    return handleErrorResponse(res, 403, 'Invalid Access Token');
  }
};

export const authorizeRoles = (...roles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.roleId)) {
      return handleErrorResponse(res, 403, 'Access Denied');
    }
    next();
  };
};

import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UsersModel } from '../db/models/usersModel';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

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
    return res.status(401).json({ message: 'Access Token Required' });
  }

  const token = authHeader.split(' ')[1].trim(); // Ensure no extra spaces

  try {
    const secretKey = process.env.JWT_SECRET as string;
    if (!secretKey) {
      throw new Error('JWT_SECRET is not defined');
    }

    console.log('Token:', token); // Log the token
    console.log('Secret key:', secretKey); // Log the secret key

    const decoded = jwt.verify(token, secretKey) as DecodedToken;

    console.log('Decoded token:', decoded); // Log the decoded token

    if (!decoded.id) {
      throw new Error('Token does not contain user ID');
    }

    const user = await UsersModel.query().findById(decoded.id);

    if (!user) {
      return res.status(403).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error('Error verifying token:', err);
    return res.status(403).json({ message: 'Invalid Access Token' });
  }
};

export const authorizeRoles = (...roles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    console.log('User Role:', req.user?.roleId);
    console.log('Authorized Roles:', roles);
    if (!req.user || !roles.includes(req.user.roleId)) {
      return res.status(403).json({ message: 'Access Denied' });
    }
    next();
  };
};

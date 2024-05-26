import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { UsersModel } from '../db/models/usersModel';

dotenv.config();

const secretKey = (process.env.JWT_SECRET as string) || 'JWT_SECRET';

if (!secretKey) {
  throw new Error('JWT_SECRET is not defined in the environment variables');
}

export const generateToken = (userId: string): string => {
  const payload = { id: userId };
  const options = { expiresIn: '24h' };
  return jwt.sign(payload, secretKey, options);
};

export const decryptToken = (token: string): string | null => {
  // console.log('Token to decrypt:', token);
  // console.log('Using secret key:', secretKey);
  const tokenWithoutBearer = token.replace('Bearer ', '');
  try {
    const decodedToken = jwt.verify(tokenWithoutBearer, secretKey) as {
      id: string;
    };
    // console.log('Decoded token:', decodedToken);
    return decodedToken.id;
  } catch (error) {
    // console.error('Error decrypting token: ', error);
    return null;
  }
};

export const getUsernameFromToken = async (
  token: string
): Promise<string | null> => {
  const userId = decryptToken(token);
  if (!userId) {
    return null;
  }

  try {
    const user = await UsersModel.query().findById(userId);
    return user ? user.username : null;
  } catch (error) {
    console.error('Error fetching user from database:', error);
    return null;
  }
};

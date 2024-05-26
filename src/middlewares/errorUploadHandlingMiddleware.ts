import { Request, Response, NextFunction } from 'express';
import multer from 'multer';

export default function errorHandlingMiddleware(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof multer.MulterError) {
    // Handle MulterError here
    const errorResponse = {
      status: 400,
      message: 'Unexpected field. Please check your file upload',
    };
    res.status(400).json(errorResponse);
  } else {
    // Handle other errors
    console.error(err);
    const errorResponse = {
      status: 500,
      message: 'Internal Server Error',
    };
    res.status(500).json(errorResponse);
  }
}

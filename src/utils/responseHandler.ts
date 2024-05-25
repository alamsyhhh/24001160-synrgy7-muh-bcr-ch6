import { Response } from 'express';

export const wrapResponse = (
  res: Response,
  status: number,
  message: string,
  data: any
): void => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

export const wrapErrorResponse = (
  res: Response,
  status: number,
  message: string
): void => {
  res.status(status).json({
    status,
    message,
  });
};

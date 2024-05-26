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

export const handleNotFoundError = (res: Response, message: string): void => {
  wrapErrorResponse(res, 404, message);
};

export const handleInternalServerError = (
  res: Response,
  message: string
): void => {
  wrapErrorResponse(res, 500, message);
};

export const handleBadRequestError = (res: Response, message: string): void => {
  wrapErrorResponse(res, 400, message);
};

export const handleErrorResponse = (
  res: Response,
  status: number,
  message: string
): void => {
  wrapErrorResponse(res, status, message);
};

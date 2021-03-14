import { Request, Response, NextFunction } from 'express';
import { HTTPCodes } from '@codes';
import { HttpException } from '@exception';

export const errorHandle = (
  error: Error | HttpException,
  _: Request,
  res: Response,
  __: NextFunction
) => {
  if (error instanceof HttpException) {
    return res.status(error.getStatus()).json(error.getResponse());
  }

  return res
    .status(HTTPCodes.INTERNAL_SERVER_ERROR)
    .json({ message: 'Internal server error' });
};

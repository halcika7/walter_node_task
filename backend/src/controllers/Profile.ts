import { NextFunction, Request, Response } from 'express';
import { HTTPCodes } from '@codes';
import * as ProfileService from '@service/Profile';

export const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.user as { id: string };
    
    await ProfileService.changePassword(id, req.body.password);

    return res
      .status(HTTPCodes.OK)
      .json({ message: 'Password successfully changed.' });
  } catch (error) {
    return next(error);
  }
};

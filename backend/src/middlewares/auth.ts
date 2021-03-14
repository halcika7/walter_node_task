import { JWTService } from '@service/JWT';
import { NextFunction, Request, Response } from 'express';
import { HTTPCodes } from '@codes';
import { UserRepository } from '@repository/User';

const returnUnAuthorizedRequest = (res: Response) =>
  res.status(HTTPCodes.UNAUTHORIZED).json({ message: 'Unauthorized request.' });

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization
    ? req.headers.authorization.split(' ')[1]
    : '';

  if (!token) return returnUnAuthorizedRequest(res);

  try {
    const decoded = JWTService.verifyToken(token) as { id: string };
    const user = await UserRepository.getById(decoded.id);

    if (!user) {
      return returnUnAuthorizedRequest(res);
    }

    req.user = { ...decoded };
  } catch (err) {
    return returnUnAuthorizedRequest(res);
  }

  return next();
};

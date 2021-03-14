import { Configuration } from '@env';
import { NextFunction, Request, Response } from 'express';
import * as AuthService from '@service/Auth';
import { HTTPCodes } from '@codes';

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await AuthService.register(req.body);
    return res.status(HTTPCodes.Created).json({ message: 'ok' });
  } catch (error) {
    return next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { accessToken } = await AuthService.login(req.body, res);

    return res.status(HTTPCodes.OK).json({ accessToken });
  } catch (error) {
    return next(error);
  }
};

export const refresh = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token =
      req.cookies[Configuration.appConfig.webToken.REFRESH_TOKEN_NAME];
    const { accessToken } = await AuthService.refresh(token, res);

    return res.status(HTTPCodes.OK).json({ accessToken });
  } catch (error) {
    return next(error);
  }
};

export const logout = (_: Request, res: Response) => {
  AuthService.logout(res);
  return res.status(HTTPCodes.OK).json({ message: 'ok' });
};

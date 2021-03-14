import {
  BadRequestException,
  InternalServerErrorException,
  UnauthorizedException,
} from '../utils/exceptions';
import { JWTService } from './JWT';
import { Response } from 'express';
import { CookieService } from './Cookie';
import { Bcrypt } from './Bcrypt';
import { UserRepository } from '@repository/User';

interface Body {
  email: string;
  password: string;
}

export const register = async (body: Body) => {
  try {
    await UserRepository.create(body);
  } catch {
    throw new InternalServerErrorException('We could not create your account.');
  }
};

export const login = async (body: Body, res: Response) => {
  try {
    const user = await UserRepository.getByEmail(body.email);

    const isPasswordCorrect = await Bcrypt.compare(
      body.password,
      user.password
    );

    if (!isPasswordCorrect) throw new BadRequestException();

    const tokenObj = { id: user._id };

    CookieService.setRefreshToken(res, JWTService.signToken(tokenObj, true));
    return { accessToken: JWTService.signToken(tokenObj) };
  } catch {
    throw new BadRequestException('Invalid Email / Password');
  }
};

export const refresh = async (token: string, res: Response) => {
  const { id } = (await JWTService.verifyToken(token, true)) as {
    id: string;
  };

  const user = await UserRepository.getById(id);

  if (!user) throw new UnauthorizedException();

  const tokenObj = { id };

  CookieService.setRefreshToken(res, JWTService.signToken(tokenObj, true));

  return { accessToken: JWTService.signToken(tokenObj) };
};

export const logout = (res: Response) => CookieService.removeRefreshToken(res);

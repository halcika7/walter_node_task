import { NextFunction, Request, Response } from 'express';
import { ValidationChain, validationResult } from 'express-validator';
import { HTTPCodes } from '@codes';

export const validate = (validations: ValidationChain[]) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await Promise.all(validations.map(validation => validation.run(req)));

  const validationErrors = validationResult(req);

  if (validationErrors.isEmpty()) return next();

  const errors = Object.fromEntries(
    validationErrors.array().map(({ param, msg }) => [param, msg])
  );

  return res.status(HTTPCodes.BAD_REQUEST).json({ errors });
};

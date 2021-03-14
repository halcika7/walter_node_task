import { validate } from '../../middlewares/bodyValidation';
import { check } from 'express-validator';
import { UserRepository } from '../../repositories/User';

const passwordValidation = (name: string, rsp: string) =>
  check(name)
    .isLength({ min: 6, max: 15 })
    .withMessage(`${rsp} must contain between 6 and 15 chars`)
    .matches(
      new RegExp(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,15})'
      )
    )
    .withMessage(
      `${rsp} needs to contain both lower and upper case characters, number, and a special character.`
    );

const confirmationPassword = check('password2')
  .custom((password2, { req }) => {
    if (password2 !== req.body.password) throw new Error();

    return true;
  })
  .withMessage('Both passwords must be the same.');

const validEmail = check('email').isEmail().withMessage('Email is not valid');

const emailLength = check('email')
  .isLength({ max: 100 })
  .withMessage('Email cannot exceed 100 characters');

const emailAlreadyInUse = check('email')
  .custom(async email => {
    const user = await UserRepository.getByEmail(email);
    if (user) throw new Error();
    return true;
  })
  .withMessage('Email already in use');

export const registerValidation = validate([
  validEmail,
  emailLength,
  emailAlreadyInUse,
  passwordValidation('password', 'Password'),
  passwordValidation('password2', 'Confirm password'),
  confirmationPassword,
]);

export const changePasswordValidation = validate([
  passwordValidation('password', 'Password'),
  passwordValidation('password2', 'Confirm password'),
  confirmationPassword,
]);

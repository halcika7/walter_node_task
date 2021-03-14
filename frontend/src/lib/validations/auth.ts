import * as yup from 'yup';

const email = yup
  .string()
  .trim()
  .email('Email is not valid')
  .max(100, 'Email cannot exceed 100 characters')
  .required('Email is required');

const password = yup
  .string()
  .min(6, 'Password must contain at least 6 characters')
  .max(15, 'Password cannot exceed 15 characters')
  .matches(
    new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,15})'),
    'Password needs to contain both lower and upper case characters, number, and a special character.'
  )
  .required('Password is required');

const passwords = {
  password,
  password2: yup
    .string()
    .when('password', {
      is: (val: string) => val && val.length > 0,
      then: yup
        .string()
        .oneOf([yup.ref('password')], 'Both passwords must be the same.'),
    })
    .required('Confirm password is required'),
};

export const UserRegister = yup.object({ email, ...passwords });

export const PasswordSchema = yup.object({ ...passwords });

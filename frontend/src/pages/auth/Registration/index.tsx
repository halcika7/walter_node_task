// hooks
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import useDarkMode from 'use-dark-mode';
import { useFormik as useForm } from 'formik';
import { NavLink, useHistory } from 'react-router-dom';

// types
import { UserRegister } from '@validations/auth';
import { AppState } from '@reducers/index';
import { RegisterData } from '@ctypes/auth';

// actions
import { register, clearErrors } from '@actions';

// components
import { CenterDiv, ErrorDiv } from '@styled/components';
import {
  ButtonsWrapper,
  ContainerWrapper,
  H1,
  ImageWrapper,
  SubmitButton,
  Paragraph,
  LinkButton,
  Wrapper,
} from '../styled';
import GoHomeArrow from '@components/GoHomeArrow';
import Input from '@components/input';
import ButtonSpinner from '@components/spinner/buttonSpinner';

import { ReactComponent as RegisterLight } from '@images/register-light.svg';
import { ReactComponent as RegisterDark } from '@images/register-dark.svg';

const reduxProps = createSelector(
  (state: AppState) => state.auth.errors,
  (state: AppState) => state.auth.message,
  (state: AppState) => state.auth.status,
  (errors, message, status) => ({ errors, message, status })
);

const Register = () => {
  const dispatch = useDispatch();
  const { value } = useDarkMode();
  const { errors, message, status } = useSelector(reduxProps);
  const history = useHistory();

  const onSubmit = (values: RegisterData) => {
    dispatch(register(values));
  };

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      password2: '',
    },
    onSubmit,
    enableReinitialize: true,
    validationSchema: UserRegister,
    initialErrors: errors,
    validateOnBlur: true,
    validateOnChange: true,
  });

  const RegisterImage = !value ? RegisterLight : RegisterDark;

  useEffect(() => {
    if (status === 201) {
      history.push('/login');
    }
  }, [status, history]);

  useEffect(() => {
    if (form.isSubmitting) {
      form.setSubmitting(false);
      form.setErrors({ ...errors });
      form.setTouched({ email: true, password2: true, password: true });
    }
  }, [message, status, errors, form]);

  useEffect(() => {
    return () => {
      dispatch(clearErrors());
    };
  }, [dispatch]);

  return (
    <ContainerWrapper as="section">
      <GoHomeArrow />
      <CenterDiv>
        <ImageWrapper>
          <RegisterImage />
        </ImageWrapper>
        <Wrapper>
          <H1>Sign Up</H1>
          <Paragraph>Become part of a wonderful community 🔔</Paragraph>
          <form onSubmit={form.handleSubmit}>
            {message && status !== 200 && <ErrorDiv>{message}</ErrorDiv>}
            <Input
              name="email"
              label="Email Address"
              type="email"
              value={form.values.email}
              error={form.errors.email}
              showError={form.errors.email && form.touched.email}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
            />
            <Input
              name="password"
              label="Password"
              type="password"
              value={form.values.password}
              error={form.errors.password}
              showError={form.errors.password && form.touched.password}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
            />
            <Input
              name="password2"
              label="Confirm Password"
              type="password"
              value={form.values.password2}
              error={form.errors.password2}
              showError={form.errors.password2 && form.touched.password2}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
            />
            <ButtonsWrapper>
              <SubmitButton
                disabled={!form.isValid || form.isSubmitting}
                type="submit"
              >
                Register {form.isSubmitting && <ButtonSpinner />}
              </SubmitButton>
              <LinkButton as={NavLink} to="/login">
                Go to Login
              </LinkButton>
            </ButtonsWrapper>
          </form>
        </Wrapper>
      </CenterDiv>
    </ContainerWrapper>
  );
};

export default Register;

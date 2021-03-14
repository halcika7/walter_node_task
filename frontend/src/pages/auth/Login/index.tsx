// hooks
// import { useCallback, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import useDarkMode from 'use-dark-mode';
import { useFormik as useForm } from 'formik';
import { LoginData } from '@ctypes/auth';

// components
import { CenterDiv, ErrorDiv } from '@styled/components';
import {
  ButtonsWrapper,
  ContainerWrapper,
  H1,
  ImageWrapper,
  LightWrapper,
  SubmitButton,
  Paragraph,
  LinkButton,
  Wrapper,
} from '../styled';
import GoHomeArrow from '@components/GoHomeArrow';
import Input from '@components/input';
import ButtonSpinner from '@components/spinner/buttonSpinner';

// actions
import { login, setMessage } from '@actions';

import { ReactComponent as LoginLight } from '@images/login-light.svg';
import { ReactComponent as LoginDark } from '@images/login-dark.svg';
import { AppState } from '@reducers/index';
import { useEffect } from 'react';

const reduxProps = createSelector(
  (state: AppState) => state.auth.message,
  (state: AppState) => state.auth.status,
  (message, status) => ({ message, status })
);

const Login = () => {
  const dispatch = useDispatch();
  const { message, status } = useSelector(reduxProps);
  const { value } = useDarkMode();

  const onSubmit = (values: LoginData) => {
    dispatch(setMessage('', null));
    dispatch(login(values));
  };

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit,
    enableReinitialize: true,
  });

  const LoginImage = !value ? LoginLight : LoginDark;

  useEffect(() => {
    if (form.isSubmitting) {
      form.setSubmitting(false);
    }
  }, [message, status, form]);

  useEffect(() => {
    return () => {
      dispatch(setMessage('', null));
    };
  }, [dispatch]);

  return (
    <ContainerWrapper as="section">
      <GoHomeArrow />
      <CenterDiv>
        <ImageWrapper>
          <LoginImage />
        </ImageWrapper>
        <Wrapper>
          <H1>Welcome Back</H1>
          <Paragraph>
            To keep connected with us please login with your personal
            information by email address and password 🔔
          </Paragraph>
          <form onSubmit={form.handleSubmit}>
            {message && status === 400 && <ErrorDiv>{message}</ErrorDiv>}
            <Input
              name="email"
              label="Email Address"
              type="email"
              value={form.values.email}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
            />
            <Input
              name="password"
              label="Password"
              type="password"
              value={form.values.password}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
            />
            <LightWrapper>
              <a href="/">Forget Password?</a>
            </LightWrapper>

            <ButtonsWrapper>
              <SubmitButton
                disabled={!form.isValid || form.isSubmitting}
                type="submit"
              >
                Login Now {form.isSubmitting && <ButtonSpinner />}
              </SubmitButton>
              <LinkButton as={NavLink} to="/register">
                Create Account
              </LinkButton>
            </ButtonsWrapper>
          </form>
        </Wrapper>
      </CenterDiv>
    </ContainerWrapper>
  );
};

export default Login;

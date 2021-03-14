// hooks
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { useFormik as useForm } from 'formik';

// actions
import { changePassword, setProfileMessage, clearProfileState } from '@actions';

// schemas
import { PasswordSchema } from '@validations/auth';

// types
import { AppState } from '@reducers/index';
import { PasswordData } from '@ctypes/profile';

// components
import { ChangePassword, FlexWrapper, Wrapper, ConfirmButton } from './styled';
import Input from '@components/input';
import SweetAlert from '@components/alert';
import ButtonSpinner from '@components/spinner/buttonSpinner';

const redux = createSelector(
  (state: AppState) => state.profile.errors,
  (state: AppState) => state.profile.message,
  (state: AppState) => state.profile.status,
  (errors, message, status) => ({ message, status, errors })
);

const Profile = () => {
  const dispatch = useDispatch();
  const { message, status, errors } = useSelector(redux);

  const onSubmit = (values: PasswordData) => {
    dispatch(clearProfileState());
    dispatch(changePassword(values));
  };

  const form = useForm({
    initialValues: {
      password: '',
      password2: '',
    },
    onSubmit,
    enableReinitialize: true,
    validationSchema: PasswordSchema,
    initialErrors: errors,
    validateOnBlur: true,
    validateOnChange: true,
  });

  const resetMessage = () => {
    if (status === 200 || status === 400) {
      form.resetForm();
    }
    dispatch(setProfileMessage('', null));
  };

  useEffect(() => {
    if (form.isSubmitting) {
      form.setSubmitting(false);
      form.setErrors({ ...errors });
      form.setTouched({ password2: true, password: true });
    }
  }, [message, status, errors, form]);

  useEffect(() => {
    return () => {
      dispatch(clearProfileState());
    };
  }, [dispatch]);

  return (
    <Wrapper>
      <FlexWrapper>
        <ChangePassword>
          <h1>Update Password</h1>
          {message && (
            <SweetAlert
              message={message}
              type={status === 200 ? 'success' : 'error'}
              callBack={resetMessage}
              withButtons
              failedButton="Close"
              successButton="OK"
            />
          )}
          <form onSubmit={form.handleSubmit}>
            <Input
              value={form.values.password}
              error={form.errors.password}
              showError={form.errors.password && form.touched.password}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              name="password"
              label="Password"
              type="password"
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
            <ConfirmButton
              disabled={!form.isValid || form.isSubmitting}
              type="button"
              onClick={form.handleSubmit as any}
            >
              Confirm {form.isSubmitting && <ButtonSpinner />}
            </ConfirmButton>
          </form>
        </ChangePassword>
      </FlexWrapper>
    </Wrapper>
  );
};

export default Profile;

import { FC, useMemo, ChangeEvent, FocusEvent } from 'react';
// components
import { ErrorDiv } from '@styled/components';
import { FormWrapper } from './styled';

import { ReactComponent as Lock } from '@images/lock.svg';
import { ReactComponent as Email } from '@images/email.svg';
import { ReactComponent as User } from '@images/user.svg';

interface Props {
  label: string;
  name: string;
  type: string;
  value: string | number | boolean;
  error?: string;
  showError?: boolean | undefined | string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: FocusEvent<HTMLInputElement>) => void;
}

const InputWrapper: FC<Props> = ({
  label,
  name,
  type,
  value,
  error = '',
  showError = false,
  onChange,
  onBlur,
}) => {
  const getIcon = useMemo(() => {
    switch (type) {
      case 'email':
        return <Email />;
      case 'password':
        return <Lock />;
      default:
        return null;
    }
  }, [type]);

  if (type === 'boolean') {
    return (
      <FormWrapper>
        {getIcon && <div>{getIcon}</div>}
        <div>
          <label htmlFor={name}>{label}</label>
          <label htmlFor={name} className="switch">
            <input
              type="checkbox"
              name={name}
              id={name}
              defaultChecked={value as boolean}
              onChange={onChange}
              onBlur={onBlur}
              autoComplete="off"
              spellCheck="false"
            />
            <span />
          </label>
          {showError && <ErrorDiv small>{error}</ErrorDiv>}
        </div>
      </FormWrapper>
    );
  }

  return (
    <FormWrapper>
      {getIcon && <div>{getIcon}</div>}
      {name === 'username' && (
        <div>
          <User />
        </div>
      )}
      <div>
        <label htmlFor={name}>{label}</label>
        <input
          type={type}
          name={name}
          id={name}
          value={value as string}
          onChange={onChange}
          onBlur={onBlur}
          autoComplete="new-password"
          spellCheck="false"
          min="1"
        />
        {showError && <ErrorDiv small>{error}</ErrorDiv>}
      </div>
    </FormWrapper>
  );
};

export default InputWrapper;

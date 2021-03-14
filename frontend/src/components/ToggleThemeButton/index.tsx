import styled from 'styled-components';
import useDarkMode from 'use-dark-mode';
import { setHeightWidth } from '@styled/components';

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  margin-left: 8px;
`;

const Input = styled.input`
  outline: 0;
  user-select: none;
  position: absolute;
  opacity: 0;
  box-sizing: border-box;
  padding: 0;
  font-size: 20px;
  line-height: 30px;
  margin: 0;

  &:checked + label::before {
    background: #ff9d34;
    background: linear-gradient(to right, #ffbc48 0, #fe7e1f 100%);
  }

  &:checked + label::after {
    left: 34px;
  }
`;

const Label = styled.label`
  line-height: 36px;
  padding-left: 78px;
  user-select: none;
  cursor: pointer;
  font-size: 16px;
  letter-spacing: -0.1px;

  &:before {
    ${setHeightWidth('36px', '64px')}
    content: '';
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    width: 64px;
    height: 36px;
    border-radius: 18px;
    background: #41a5ea;
    background: linear-gradient(to right, #2feafc 0, #535fd7 100%);
  }

  &:after {
    ${setHeightWidth('24px')}
    content: '';
    position: absolute;
    display: block;
    background: ${props => props.theme.colors.white};
    top: 6px;
    left: 6px;
    border-radius: 12px;
    transition: all 0.15s ease-out;
  }
`;

const ToggleButtonTheme = () => {
  const { toggle, value } = useDarkMode();

  return (
    <Wrapper>
      <Input
        type="checkbox"
        name="lights-toggle"
        id="lights-toggle"
        defaultChecked={!value}
        onClick={toggle}
      />
      <Label htmlFor="lights-toggle" aria-label="toggle theme button" />
    </Wrapper>
  );
};

export default ToggleButtonTheme;

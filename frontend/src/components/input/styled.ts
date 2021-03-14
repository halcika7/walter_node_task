import styled from 'styled-components';
import {
  CenterAllFlex,
  setHeightWidth,
  FlexColumn,
} from '../../styled/components';

export const FormWrapper = styled.div`
  display: flex;
  padding: 14px;
  width: 100%;
  max-width: 500px;
  min-width: 215px;
  margin: 1rem 0;
  background: ${props => props.theme.bg.formGroup};
  border-radius: 5px;

  > div:first-child {
    flex-basis: 15%;
    ${CenterAllFlex}

    > svg {
      ${setHeightWidth('32px')}

      > g > g {
        stroke: ${props => props.theme.text.primary};
      }

      > g > g > path:first-child {
        fill: ${props => props.theme.text.primary};
      }
    }
  }

  > div:nth-child(2),
  > div:only-child {
    ${FlexColumn}
    flex-basis: 80%;
    margin-left: 10px;

    > label {
      font-size: 0.8rem;
      font-weight: 300;
      line-height: 18px;

      &.switch {
        ${setHeightWidth('24px', '60px')}
        position: relative;
        display: inline-block;
        margin-top: 0.5rem;

        > input {
          ${setHeightWidth(0)}
          opacity: 0;

          &:checked + span {
            background-color: ${props => props.theme.bg.accent};
          }

          &:focus + span {
            box-shadow: 0 0 1px ${props => props.theme.bg.accent};
          }

          &:checked + span:before {
            transform: translateX(36px);
            background-color: white;
          }
        }

        > span {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #cccccc2e;
          -webkit-transition: 0.4s;
          transition: 0.4s;
          border-radius: 34px;

          &:before {
            ${setHeightWidth('16px')}
            position: absolute;
            content: '';
            left: 4px;
            bottom: 4px;
            background-color: ${props => props.theme.text.primary};
            -webkit-transition: 0.4s;
            transition: 0.4s;
            border-radius: 50%;
          }
        }
      }
    }

    input {
      border: none;
      background: transparent;
      font-size: 1rem;
      font-weight: 400;
      outline: none;
      color: ${props => props.theme.text.primary};
      padding: 4px 0;
      width: 100%;
    }
  }

  > div:only-child {
    flex-basis: 100%;
    margin-left: 0;
    align-items: flex-start;
  }
`;

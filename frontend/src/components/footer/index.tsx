import styled from 'styled-components';
import {
  Container,
  AlignCenterDiv,
  setHeightWidth,
  setMarginPadding,
} from '@styled/components';
import LogoLink from '../LogoLink';

import { ReactComponent as Git } from '@images/github.svg';
import { ReactComponent as In } from '@images/linkedin.svg';

const FooterWrapper = styled.footer`
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0px;
  background: #182538;
  color: #6b7a90;
  position: relative;
  width: 100%;
  margin-top: auto;

  &:before {
    content: '';
    ${setHeightWidth('1px', '100%')}
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    background: #304057;
  }
`;

const CenterWrapper = styled(AlignCenterDiv)`
  position: relative;
  padding: 48px 0;
  justify-content: space-between;

  @media (min-width: 641px) {
    padding: 72px 0;
  }

  @media (max-width: 641px) {
    flex-wrap: wrap;
  }
`;

const Ul = styled.ul`
  ${setMarginPadding(0, 0)}
  display: flex;
  margin: 0;
  padding: 0;
  list-style: none;

  @media (min-width: 641px) {
    flex: 50%;
    justify-content: flex-end;
  }

  @media (max-width: 641px) {
    flex: 100%;
    justify-content: center;
  }

  li {
    display: flex;

    > a {
      padding: 8px;
      text-decoration: none;
      color: #8595ae;

      > span {
        ${setHeightWidth('1px')}
        clip: rect(1px, 1px, 1px, 1px);
        position: absolute;
        overflow: hidden;
        word-wrap: normal;
      }

      svg {
        ${setHeightWidth('20px')}

        path,
        circle,
        rect {
          fill: ${props => props.theme.colors.white};
        }
      }
    }
  }
`;

const Brand = styled(AlignCenterDiv)`
  @media (min-width: 641px) {
    flex: 50%;
  }

  @media (max-width: 641px) {
    flex: 100%;
    justify-content: center;
    margin-bottom: 24px;
  }
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <Container>
        <CenterWrapper>
          <Brand>
            <LogoLink />
          </Brand>
          <Ul>
            <li>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://github.com/halcika7"
              >
                <span className="screen-reader-text">Github</span>
                <Git />
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.linkedin.com/in/haris-beslic/"
              >
                <span className="screen-reader-text">LinkedIn</span>
                <In />
              </a>
            </li>
          </Ul>
        </CenterWrapper>
      </Container>
    </FooterWrapper>
  );
};

export default Footer;

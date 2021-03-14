import { fontSizes, fontWeights } from './components/props/font';

const colors = {
  white: '#fff',
  black: '#111',
};

const light = {
  bg: {
    accent: '#FE963F',
    formGroup: '#f5f5f5c7',
    header: 'url(/svgs/header-illustration-light.svg)',
    sidebar: '#fff',
    skeleton: 'lightgray',
    skeletonAnimation: '#fff3',
  },
  text: {
    primary: '#182538',
  },
  boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)',
};

const dark = {
  bg: {
    accent: '#6280DF',
    formGroup: '#1111113b',
    header: 'url(/svgs/header-illustration-dark.svg)',
    sidebar: '#182538',
    skeleton: '#1d1c1c42',
    skeletonAnimation: '#23222287',
  },
  text: {
    primary: '#fff',
  },
  boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)',
};

const defaultTheme = {
  fontSizes,
  fontWeights,
  lineHeights: {
    body: 1.5,
    heading: 1.3,
    code: 1.6,
  },
};

export const lightTheme = { ...defaultTheme, ...light, colors };
export const darkTheme = { ...defaultTheme, ...dark, colors };

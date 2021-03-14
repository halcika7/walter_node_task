import { useState, useEffect, FC } from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './theme';
import useDarkMode from 'use-dark-mode';

const Theme: FC = ({ children }) => {
  const { value } = useDarkMode(false, {
    storageKey: undefined,
    onChange: undefined,
  });
  const theme = value ? darkTheme : lightTheme;

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const fn = () => {
      if (localStorage.getItem('darkMode') === null) {
        localStorage.setItem('darkMode', JSON.stringify(false));
      }
    };
    fn();
    setMounted(true);
    window.addEventListener('storage', fn);

    return () => {
      window.removeEventListener('storage', fn);
    };
  }, []);

  const body = <ThemeProvider theme={theme}>{children}</ThemeProvider>;

  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{body}</div>;
  }

  return body;
};

export default Theme;

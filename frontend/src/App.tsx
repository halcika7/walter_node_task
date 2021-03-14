// hooks
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// actions
import { refresh } from './redux/actions';

import Footer from './components/footer';
import Nav from './components/nav';
import Routes from './routes';
import { Container } from './styled/components';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refresh(true));
  }, [dispatch]);

  return (
    <>
      <Nav />
      <Container as="main">
        <Routes />
      </Container>
      <Footer />
    </>
  );
}

export default App;

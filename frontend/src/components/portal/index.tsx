import { FC, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const Portal: FC<{ id?: string }> = ({ id = 'portal', children }) => {
  const el = useRef(
    document.getElementById(id) || document.createElement('div')
  );

  useEffect(() => {
    const { current } = el;

    document.body.classList.add('no-scroll');

    current.id = id;
    document.body.appendChild(current);

    return () => {
      if (current.parentElement) {
        current.parentElement.removeChild(current);
      }
      document.body.classList.remove('no-scroll');
    };
  }, [id]);

  return createPortal(children, el.current);
};

export default Portal;

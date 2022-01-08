import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

interface IProps {
  children: ReactNode;
  closePortal: () => void;
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
`;

const ModalPortal: FC<IProps> = ({ children, closePortal }) => {
  const ref = useRef<Element | null>();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (document) {
      const dom = document.querySelector('#root-modal');
      ref.current = dom;
    }
  }, []);
  if (ref.current && mounted) {
    return createPortal(
      <Container>
        <Background role="presentation" onClick={closePortal} />
        {children}
      </Container>,
      ref.current
    );
  }
  return null;
};

export default ModalPortal;

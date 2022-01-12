import { FC } from 'react';
import styled from 'styled-components';
import { RootState, useSelector } from '../../store';
import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';

interface IProps {
  closeModal: () => void;
}

const Container = styled.div`
  z-index: 11;
`;

const AuthModal: FC<IProps> = ({ closeModal }) => {
  const authMode = useSelector((state: RootState) => state.auth.authMode);
  return (
    <Container>
      {authMode === 'signup' && <SignUpModal closeModal={closeModal} />}
      {authMode === 'login' && <LoginModal closeModal={closeModal} />}
    </Container>
  );
};

export default AuthModal;

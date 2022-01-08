import Link from 'next/link';
import { FC } from 'react';
import styled from 'styled-components';
import useModal from '../hooks/useModal';
import Icon from '../public/static/svg/logo/logo.svg';
import TextIcon from '../public/static/svg/logo/logo_text.svg';
import palette from '../styles/palette';
import SignUpModal from './auth/SignUpModal';

const Container = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 80px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 12px;
  z-index: 10;
`;

const LogoWrapper = styled.a`
  display: flex;
  align-items: center;
`;

const LogoIcon = styled(Icon)`
  margin-right: 6px;
`;

const ButtonWrapper = styled.div``;

const SignUpBtn = styled.button`
  height: 42px;
  margin-right: 8px;
  padding: 0px 16px;
  border: 0;
  border-radius: 21px;
  background-color: white;
  cursor: pointer;
  outline: none;
  &:hover {
    background-color: ${palette.gray_f7};
  }
`;

const LogInBtn = styled.button`
  height: 42px;
  padding: 0 16px;
  border: 0;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.18);
  border-radius: 21px;
  background-color: white;
  cursor: pointer;
  outline: none;
  &:hover {
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
  }
`;

const Header: FC = () => {
  const { openModalPortal, ModalPortal } = useModal();
  return (
    <Container>
      <Link href="/">
        <LogoWrapper>
          <LogoIcon />
          <TextIcon />
        </LogoWrapper>
      </Link>
      <ButtonWrapper>
        <SignUpBtn onClick={openModalPortal}>회원가입</SignUpBtn>
        <LogInBtn>로그인</LogInBtn>
      </ButtonWrapper>
      <ModalPortal>
        <SignUpModal />
      </ModalPortal>
    </Container>
  );
};

export default Header;

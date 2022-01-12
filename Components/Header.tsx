import Link from 'next/link';
import { FC } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import useModal from '../hooks/useModal';
import Icon from '../public/static/svg/logo/logo.svg';
import TextIcon from '../public/static/svg/logo/logo_text.svg';
import { useSelector } from '../store';
import { authActions } from '../store/auth';
import palette from '../styles/palette';
import AuthModal from './auths/AuthModal';

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

const AuthBtnsWrapper = styled.div``;

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

const ProfileBtn = styled.button`
  display: flex;
  align-items: center;
  height: 42px;
  padding: 0 6px 0 16px;
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

const ProfileImg = styled.img`
  margin-left: 8px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

const Header: FC = () => {
  const { openModalPortal, ModalPortal, closeModalPortal } = useModal();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <Container>
      <Link href="/">
        <LogoWrapper>
          <LogoIcon />
          <TextIcon />
        </LogoWrapper>
      </Link>
      {!user.isLogged && (
        <AuthBtnsWrapper>
          <SignUpBtn
            onClick={() => {
              dispatch(authActions.setAuthMode('signup'));
              openModalPortal();
            }}
          >
            회원가입
          </SignUpBtn>
          <LogInBtn
            onClick={() => {
              dispatch(authActions.setAuthMode('login'));
              openModalPortal();
            }}
          >
            로그인
          </LogInBtn>
        </AuthBtnsWrapper>
      )}
      {user.isLogged && (
        <ProfileBtn type="button">
          <AiOutlineMenu />
          <ProfileImg src={user.profileImage} alt="Profile Img" />
        </ProfileBtn>
      )}
      <ModalPortal>
        <AuthModal closeModal={closeModalPortal} />
      </ModalPortal>
    </Container>
  );
};

export default Header;

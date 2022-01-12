import { ChangeEvent, useEffect, useState } from 'react';
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiOutlineClose,
  AiOutlineMail,
} from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import useValidateMode from '../../hooks/useValidateMode';
import { loginAPI } from '../../lib/api/auth';
import { authActions } from '../../store/auth';
import { userActions } from '../../store/user';
import palette from '../../styles/palette';
import Button from '../common/Button';
import Input from '../common/Input';

const Container = styled.form`
  width: 568px;
  padding: 32px;
  background-color: white;
  z-index: 11;
  .close-icon {
    cursor: pointer;
    display: block;
    margin: 0 0 40px auto;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 16px;
`;

const PasswordWrapper = styled(InputWrapper)`
  svg {
    cursor: pointer;
  }
`;

const SubmitBtnWrapper = styled.div`
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid ${palette.gray_eb};
`;

const SetSignUp = styled.span`
  color: ${palette.dark_cyan};
  margin-left: 8px;
  cursor: pointer;
`;

interface IProps {
  closeModal: () => void;
}

const LoginModal: React.FC<IProps> = ({ closeModal }) => {
  const { setValidateMode } = useValidateMode();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isPasswordHided, setIsPasswordHided] = useState(true);

  useEffect(() => {
    return () => {
      setValidateMode(false);
    };
  }, []);

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const togglePasswordHiding = () => {
    setIsPasswordHided(!isPasswordHided);
  };

  const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    setValidateMode(true);

    if (email && password) {
      try {
        const loginBody = {
          email,
          password,
        };
        const { data } = await loginAPI(loginBody);
        dispatch(userActions.setLoggedUser(data));
        closeModal();
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <Container onSubmit={onSubmit}>
      <AiOutlineClose className="close-icon" onClick={closeModal} />
      <InputWrapper>
        <Input
          placeholder="이메일 주소"
          name="email"
          type="email"
          icon={<AiOutlineMail />}
          value={email}
          onChange={onChangeEmail}
          isValid={!!email}
          errorMessage="이메일을 입력하세요"
        />
      </InputWrapper>
      <PasswordWrapper>
        <Input
          placeholder="비밀번호 설정하기"
          name="password"
          icon={
            isPasswordHided ? (
              <AiFillEyeInvisible onClick={togglePasswordHiding} />
            ) : (
              <AiFillEye onClick={togglePasswordHiding} />
            )
          }
          type={isPasswordHided ? 'password' : 'text'}
          value={password}
          onChange={onChangePassword}
          isValid={!!password}
          errorMessage="비밀번호를 입력하세요"
        />
      </PasswordWrapper>
      <SubmitBtnWrapper>
        <Button type="submit">로그인</Button>
      </SubmitBtnWrapper>
      <p>
        이미 에어비앤비 계정이 있나요?
        <SetSignUp
          onClick={() => dispatch(authActions.setAuthMode('signup'))}
          role="presentation"
        >
          회원가입
        </SetSignUp>
      </p>
    </Container>
  );
};

export default LoginModal;

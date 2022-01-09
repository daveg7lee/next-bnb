import { ChangeEvent, FC, useState } from 'react';
import styled from 'styled-components';
import XIcon from '../../public/static/svg/modal/modal_x_icon.svg';
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineMail,
  AiOutlineUser,
} from 'react-icons/ai';
import Input from '../common/Input';
import palette from '../../styles/palette';
import Selector from '../common/Selector';
import { monthList } from '../../lib/staticData';

const Container = styled.div`
  width: 568px;
  padding: 32px;
  background-color: white;
  z-index: 11;
  .password-input-wrapper {
    svg {
      cursor: pointer;
    }
  }
`;

const CloseIcon = styled(XIcon)`
  cursor: pointer;
  display: block;
  margin: 0 0 40px auto;
`;

const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 16px;
  svg {
    position: absolute;
    right: 11px;
    top: 16px;
  }
`;

const BirthDatLabel = styled.p`
  font-size: 16px;
  font-weight: 600;
  margin-top: 16px;
  margin-bottom: 8px;
`;

const BirthdayInfo = styled.p`
  margin-bottom: 16px;
  color: ${palette.charcoal};
`;

const SignUpModal: FC = () => {
  const [hidePassword, setHidePassword] = useState(false);
  const [email, setEmail] = useState('');
  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [password, setPassword] = useState('');

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangeLastname = (e: ChangeEvent<HTMLInputElement>) => {
    setLastname(e.target.value);
  };

  const onChangeFirstname = (e: ChangeEvent<HTMLInputElement>) => {
    setFirstname(e.target.value);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const toggleHidePassword = () => {
    setHidePassword(!hidePassword);
  };

  return (
    <Container>
      <CloseIcon />
      <InputWrapper>
        <Input
          type="email"
          placeholder="이메일 주소"
          icon={<AiOutlineMail size="20px" />}
          name="email"
          value={email}
          onChange={onChangeEmail}
        />
      </InputWrapper>
      <InputWrapper>
        <Input
          placeholder="이름(예:길동)"
          icon={<AiOutlineUser size="20px" />}
          value={lastname}
          onChange={onChangeLastname}
        />
      </InputWrapper>
      <InputWrapper>
        <Input
          placeholder="성(예:홍)"
          icon={<AiOutlineUser size="20px" />}
          value={firstname}
          onChange={onChangeFirstname}
        />
      </InputWrapper>
      <InputWrapper className="password-input-wrapper">
        <Input
          placeholder="비밀번호 설정하기"
          type={hidePassword ? 'password' : 'text'}
          icon={
            hidePassword ? (
              <AiOutlineEyeInvisible size="20px" onClick={toggleHidePassword} />
            ) : (
              <AiOutlineEye size="20px" onClick={toggleHidePassword} />
            )
          }
          value={password}
          onChange={onChangePassword}
        />
      </InputWrapper>
      <BirthDatLabel>생일</BirthDatLabel>
      <BirthdayInfo>
        만 18세 이상의 성인만 회원으로 가입할 수 있습니다. 생일은 다른
        에어비앤비 사용자에게 공개되지 않습니다.
      </BirthdayInfo>
      <Selector
        options={monthList}
        disabledOptions={['월']}
        defaultValue="월"
      />
    </Container>
  );
};

export default SignUpModal;

import { ChangeEvent, FC, FormEvent, useState } from 'react';
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
import { dayList, monthList, yearList } from '../../lib/staticData';
import Button from '../common/Button';
import { signupAPI } from '../../lib/api/auth';
import { useDispatch } from 'react-redux';
import { userActions } from '../../store/user';

const Container = styled.form`
  width: 568px;
  padding: 32px;
  background-color: white;
  z-index: 11;
  .password-input-wrapper {
    svg {
      cursor: pointer;
    }
  }
  .birthday-selectors {
    display: flex;
    margin-bottom: 24px;

    div:not(:last-child) {
      margin-right: 16px;
    }

    .birthday-year-selector {
      flex-grow: 2;
    }

    .birthday-month-selector {
      flex-grow: 1;
    }

    .birthday-day-selector {
      flex-grow: 1;
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

const SubmitBtnWrapper = styled.div`
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid ${palette.gray_eb};
`;

const SignUpModal: FC = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const [email, setEmail] = useState('');
  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [password, setPassword] = useState('');
  const [birthMonth, setBirthMonth] = useState('월');
  const [birthDay, setBirthDay] = useState('일');
  const [birthYear, setBirthYear] = useState('년');
  const [validateMode, setValidateMode] = useState(false);
  const dispatch = useDispatch();

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

  const onChangeBirthMonth = (e: ChangeEvent<HTMLSelectElement>) => {
    setBirthMonth(e.target.value);
  };

  const onChangeBirthYear = (e: ChangeEvent<HTMLSelectElement>) => {
    setBirthYear(e.target.value);
  };

  const onChangeBirthDay = (e: ChangeEvent<HTMLSelectElement>) => {
    setBirthDay(e.target.value);
  };

  const toggleHidePassword = () => {
    setHidePassword(!hidePassword);
  };

  const onSubmitSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setValidateMode(true);

    if (!email || !lastname || !firstname || !password) {
      return undefined;
    }

    try {
      const signUpBody = {
        email,
        lastname,
        firstname,
        password,
        birthday: new Date(
          `${birthYear!.replace('년', '')}-${birthMonth!.replace(
            '월',
            ''
          )}-${birthDay!.replace('일', '')}`
        ).toISOString(),
      };
      const { data } = await signupAPI(signUpBody);
      dispatch(userActions.setLoggedUser(data));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container onSubmit={onSubmitSignup}>
      <CloseIcon />
      <InputWrapper>
        <Input
          type="email"
          placeholder="이메일 주소"
          icon={<AiOutlineMail size="20px" />}
          name="email"
          value={email}
          onChange={onChangeEmail}
          validateMode={validateMode}
          useValidation
          isValid={!!email}
          errorMessage="이메일을 입력하세요"
        />
      </InputWrapper>
      <InputWrapper>
        <Input
          placeholder="이름(예:길동)"
          icon={<AiOutlineUser size="20px" />}
          value={lastname}
          onChange={onChangeLastname}
          validateMode={validateMode}
          useValidation
          isValid={!!lastname}
          errorMessage="이름을 입력하세요"
        />
      </InputWrapper>
      <InputWrapper>
        <Input
          placeholder="성(예:홍)"
          icon={<AiOutlineUser size="20px" />}
          value={firstname}
          onChange={onChangeFirstname}
          validateMode={validateMode}
          useValidation
          isValid={!!firstname}
          errorMessage="성을 입력하세요"
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
          validateMode={validateMode}
          useValidation
          isValid={!!password}
          errorMessage="비밀번호를 입력하세요"
        />
      </InputWrapper>
      <BirthDatLabel>생일</BirthDatLabel>
      <BirthdayInfo>
        만 18세 이상의 성인만 회원으로 가입할 수 있습니다. 생일은 다른
        에어비앤비 사용자에게 공개되지 않습니다.
      </BirthdayInfo>
      <div className="birthday-selectors">
        <div className="birthday-year-selector">
          <Selector
            options={yearList}
            disabledOptions={['년']}
            value={birthYear}
            onChange={onChangeBirthYear}
          />
        </div>
        <div className="birthday-month-selector">
          <Selector
            options={monthList}
            disabledOptions={['월']}
            value={birthMonth}
            onChange={onChangeBirthMonth}
          />
        </div>
        <div className="birthday-day-selector">
          <Selector
            options={dayList}
            disabledOptions={['일']}
            value={birthDay}
            onChange={onChangeBirthDay}
          />
        </div>
      </div>
      <SubmitBtnWrapper>
        <Button type="submit">가입하기</Button>
      </SubmitBtnWrapper>
    </Container>
  );
};

export default SignUpModal;

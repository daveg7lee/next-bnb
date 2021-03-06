import {
  ChangeEvent,
  FC,
  FormEvent,
  useEffect,
  useMemo,
  useState,
} from 'react';
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
import useValidateMode from '../../hooks/useValidateMode';
import PasswordWarning from './PasswordWarning';
import { authActions } from '../../store/auth';

interface IProps {
  closeModal: () => void;
}

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

const SetLogin = styled.span`
  color: ${palette.dark_cyan};
  margin-left: 8px;
  cursor: pointer;
`;

const PASSWORD_MIN_LENGTH = 8;

const SignUpModal: FC<IProps> = ({ closeModal }) => {
  const { setValidateMode } = useValidateMode();
  const [hidePassword, setHidePassword] = useState(true);
  const [email, setEmail] = useState('');
  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [password, setPassword] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [passwordFocused, setPasswordFocused] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      setValidateMode(false);
    };
  }, []);

  const isPasswordHasNameOrEmail = useMemo(
    () =>
      !password ||
      !lastname ||
      password.includes(lastname) ||
      password.includes(email.split('@')[0]),
    [password, lastname, email]
  );

  const isPasswordOverMinLength = useMemo(
    () => !!password && password.length >= PASSWORD_MIN_LENGTH,
    [password]
  );

  const isPasswordHasNumberOrSymbol = useMemo(
    () =>
      /[{}[\]/?.,;:|)*~`!^\-_+<>@#$%\\=('"]/g.test(password) ||
      /[0-9]/g.test(password),
    [password]
  );

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

  const onFocusPassword = () => {
    setPasswordFocused(true);
  };

  const validateSignUpForm = () => {
    if (!email || !lastname || !firstname || !password) {
      return false;
    }
    if (
      isPasswordHasNameOrEmail ||
      !isPasswordOverMinLength ||
      !isPasswordHasNumberOrSymbol
    ) {
      return false;
    }
    if (!birthDay || !birthYear || !birthMonth) {
      return false;
    }
    return true;
  };

  const onSubmitSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setValidateMode(true);

    if (validateSignUpForm()) {
      try {
        const signUpBody = {
          email,
          lastname,
          firstname,
          password,
          birthday: new Date(
            `${birthYear!.replace('???', '')}-${birthMonth!.replace(
              '???',
              ''
            )}-${birthDay!.replace('???', '')}`
          ).toISOString(),
        };

        const { data } = await signupAPI(signUpBody);

        dispatch(userActions.setLoggedUser(data));

        closeModal();
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <Container onSubmit={onSubmitSignup}>
      <CloseIcon onClick={closeModal} />
      <InputWrapper>
        <Input
          type="email"
          placeholder="????????? ??????"
          icon={<AiOutlineMail size="20px" />}
          name="email"
          value={email}
          onChange={onChangeEmail}
          useValidation
          isValid={!!email}
          errorMessage="???????????? ???????????????"
        />
      </InputWrapper>
      <InputWrapper>
        <Input
          placeholder="??????(???:??????)"
          icon={<AiOutlineUser size="20px" />}
          value={lastname}
          onChange={onChangeLastname}
          useValidation
          isValid={!!lastname}
          errorMessage="????????? ???????????????"
        />
      </InputWrapper>
      <InputWrapper>
        <Input
          placeholder="???(???:???)"
          icon={<AiOutlineUser size="20px" />}
          value={firstname}
          onChange={onChangeFirstname}
          useValidation
          isValid={!!firstname}
          errorMessage="?????? ???????????????"
        />
      </InputWrapper>
      <InputWrapper className="password-input-wrapper">
        <Input
          placeholder="???????????? ????????????"
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
          useValidation
          isValid={
            !isPasswordHasNameOrEmail &&
            isPasswordOverMinLength &&
            isPasswordHasNumberOrSymbol
          }
          errorMessage="??????????????? ???????????????"
          onFocus={onFocusPassword}
        />
      </InputWrapper>
      {passwordFocused && (
        <>
          <PasswordWarning
            isValid={isPasswordHasNameOrEmail}
            text="??????????????? ?????? ???????????? ????????? ????????? ????????? ??? ????????????"
          />
          <PasswordWarning isValid={!isPasswordOverMinLength} text="?????? 8???" />
          <PasswordWarning
            isValid={!isPasswordHasNumberOrSymbol}
            text="????????? ????????? ???????????????"
          />
        </>
      )}
      <BirthDatLabel>??????</BirthDatLabel>
      <BirthdayInfo>
        ??? 18??? ????????? ????????? ???????????? ????????? ??? ????????????. ????????? ??????
        ??????????????? ??????????????? ???????????? ????????????.
      </BirthdayInfo>
      <div className="birthday-selectors">
        <div className="birthday-year-selector">
          <Selector
            options={yearList}
            disabledOptions={['???']}
            value={birthYear || '???'}
            onChange={onChangeBirthYear}
            isValid={!!birthYear}
          />
        </div>
        <div className="birthday-month-selector">
          <Selector
            options={monthList}
            disabledOptions={['???']}
            value={birthMonth || '???'}
            onChange={onChangeBirthMonth}
            isValid={!!birthMonth}
          />
        </div>
        <div className="birthday-day-selector">
          <Selector
            options={dayList}
            disabledOptions={['???']}
            value={birthDay || '???'}
            onChange={onChangeBirthDay}
            isValid={!!birthDay}
          />
        </div>
      </div>
      <SubmitBtnWrapper>
        <Button type="submit">????????????</Button>
      </SubmitBtnWrapper>
      <p>
        ?????? ??????????????? ????????? ??????????
        <SetLogin
          role="presentation"
          onClick={() => dispatch(authActions.setAuthMode('login'))}
        >
          ?????????
        </SetLogin>
      </p>
    </Container>
  );
};

export default SignUpModal;

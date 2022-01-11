import { FC, InputHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';
import palette from '../../styles/palette';

type InputContainerProps = {
  iconExist: boolean;
  isValid: boolean;
  useValidation: boolean;
};

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: JSX.Element;
  isValid?: boolean;
  validateMode?: boolean;
  useValidation?: boolean;
  errorMessage?: string;
}

const Container = styled.div<InputContainerProps>`
  input {
    position: relative;
    width: 100%;
    height: 46px;
    padding: ${({ iconExist }) => (iconExist ? '0 44px 0 11px' : '0 11px')};
    border: 1px solid ${palette.gray_eb};
    border-radius: 4px;
    font-size: 16px;
    outline: none;
    ::placeholder {
      color: ${palette.gray_76};
    }
    &:focus {
      border-color: ${palette.dark_cyan} !important;
    }
  }
  svg {
    position: absolute;
    right: 11px;
    top: 0 !important;
    height: 46px;
  }
  ${({ useValidation, isValid }) =>
    useValidation &&
    !isValid &&
    css`
      input {
        background-color: ${palette.snow};
        border-color: ${palette.orange};
        &:focus {
          border-color: ${palette.orange};
        }
      }
    `}
  ${({ useValidation, isValid }) =>
    useValidation &&
    isValid &&
    css`
    input{
      border-color: ${palette.dark_cyan}
    `}
`;

const ErrorMessage = styled.p`
  margin-top: 8px;
  font-weight: 600;
  font-size: 14px;
  color: ${palette.tawny};
`;

const Input: FC<IProps> = ({
  icon,
  validateMode,
  isValid = false,
  useValidation = true,
  errorMessage,
  ...props
}) => {
  return (
    <Container
      iconExist={!!icon}
      isValid={isValid}
      useValidation={validateMode && useValidation}
    >
      <input {...props} />
      {icon}
      {useValidation && validateMode && !isValid && errorMessage && (
        <ErrorMessage>{errorMessage}</ErrorMessage>
      )}
    </Container>
  );
};

export default Input;

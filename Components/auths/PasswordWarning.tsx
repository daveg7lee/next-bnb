import { FC } from 'react';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import styled from 'styled-components';
import palette from '../../styles/palette';

interface IProps {
  isValid: boolean;
  text: string;
}

const Container = styled.p<{ isValid: boolean }>`
  color: ${({ isValid }) =>
    isValid ? palette.davidson_orange : palette.green};
  display: flex;
  align-items: center;
  svg {
    margin-right: 8px;
  }
`;

const PasswordWarning: FC<IProps> = ({ isValid, text }) => {
  return (
    <Container isValid={isValid}>
      {isValid ? (
        <AiOutlineClose color={palette.davidson_orange} />
      ) : (
        <AiOutlineCheck color={palette.green} />
      )}
      {text}
    </Container>
  );
};

export default PasswordWarning;

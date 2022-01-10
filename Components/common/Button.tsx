import { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';

const Container = styled.button`
  width: 100%;
  height: 48px;
  border: 0;
  border-radius: 4px;
  background-color: ${palette.bittersweet};
  color: white;
  font-size: 16px;
  font-weight: 800;
  outline: none;
  cursor: pointer;
`;

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const Button: FC<IProps> = ({ children, ...props }) => {
  return <Container {...props}>{children}</Container>;
};

export default Button;

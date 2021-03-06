import { FC, SelectHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';
import { useSelector } from '../../store';
import palette from '../../styles/palette';

interface IProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options?: string[];
  disabledOptions?: string[];
  value?: string;
  isValid?: boolean;
}

const Container = styled.div<{ isValid: boolean; validateMode: boolean }>`
  width: 100%;
  height: 46px;

  select {
    width: 100%;
    height: 100%;
    background-color: white;
    border: 1px solid ${palette.gray_eb};
    padding: 0 11px;
    border-radius: 4px;
    outline: none;
    appearance: none;
    background-image: url('/static/svg/common/selector/selector_down_arrow.svg');
    background-position: right 11px center;
    background-repeat: no-repeat;
    font-size: 16px;

    &:focus {
      border-color: ${palette.dark_cyan};
    }
  }
  ${({ isValid, validateMode }) =>
    validateMode &&
    css`
      select {
        border-color: ${isValid ? palette.dark_cyan : palette.tawny} !important;
        background-color: ${isValid ? 'white' : palette.snow};
      }
    `}
`;

const Selector: FC<IProps> = ({
  options = [],
  disabledOptions = [],
  isValid,
  ...props
}) => {
  const validateMode = useSelector((state) => state.common.validateMode);
  return (
    <Container isValid={isValid} validateMode={validateMode}>
      <select {...props}>
        {disabledOptions.map((option, index) => (
          <option value={option} key={index} disabled>
            {option}
          </option>
        ))}
        {options.map((option, index) => (
          <option value={option} key={index}>
            {option}
          </option>
        ))}
      </select>
    </Container>
  );
};

export default Selector;

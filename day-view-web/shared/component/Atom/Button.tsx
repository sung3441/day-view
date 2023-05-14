import { ComponentPropsWithoutRef, memo } from 'react';
import styled, { css } from 'styled-components';

type ButtonType = ComponentPropsWithoutRef<'button'>;
interface Props extends ButtonType {
  isActiveFnc?: boolean;
}

const Button = ({ children, isActiveFnc, ...props }: Props) => {
  return (
    <ButtonStyle isActiveFnc={isActiveFnc} {...props}>
      {children}
    </ButtonStyle>
  );
};

const ButtonStyle = styled.button<{ isActiveFnc?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 90px;
  height: 40px;

  font-size: 16px;
  font-weight: 700;

  background: #ffffff;
  /* G_300 */
  border: 1px solid #ffffff;
  border-radius: 4px;
  transition: all 0.1s ease-out 0.02s;

  ${({ isActiveFnc }) =>
    isActiveFnc &&
    css`
      :active,
      :hover {
        border: 1px solid #dbdbdb;
        border-radius: 50%;
        background: #f3f3f3 !important;
        opacity: 0.8;
      }
    `}
`;

export default memo(Button);

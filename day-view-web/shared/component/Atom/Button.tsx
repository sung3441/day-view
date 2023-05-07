import { ComponentPropsWithoutRef, memo } from 'react';
import styled from 'styled-components';

type ButtonType = ComponentPropsWithoutRef<'button'>;
interface Props extends ButtonType {}

const Button = ({ children, ...props }: Props) => {
  return <ButtonStyle {...props}>{children}</ButtonStyle>;
};

const ButtonStyle = styled.button`
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

  :active,
  :hover {
    border: 1px solid #dbdbdb;
    border-radius: 50%;
    background: #f3f3f3 !important;
    opacity: 0.8;
  }
`;

export default memo(Button);

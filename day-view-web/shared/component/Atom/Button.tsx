import React, { ComponentProps, ReactNode, memo } from 'react';
import styled, { StyledComponentPropsWithRef } from 'styled-components';

// https://velog.io/@dongkyun/TS-HTMLElement%EC%9D%98-type-%EC%83%81%EC%86%8D%EB%B0%9B%EA%B8%B0https://velog.io/@dongkyun/TS-HTMLElement%EC%9D%98-type-%EC%83%81%EC%86%8D%EB%B0%9B%EA%B8%B0
const ButtonStyle = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 90px;
  height: 40px;

  border-radius: 4px;

  font-size: 16px;
  font-weight: 700;

  background: #ffffff;
  /* G_300 */
  border: 1px solid #ffffff;
  border-radius: 4px;
`;
type ButtonType = StyledComponentPropsWithRef<typeof ButtonStyle>;

interface Props extends ButtonType {
  children?: ReactNode;
}

const Button = ({ children, ...props }: Props) => {
  return <ButtonStyle {...props}>{children}</ButtonStyle>;
};

export default memo(Button);

import styled, { css } from 'styled-components';
import { CSSProperties } from 'react';
import { getStyledThemProperty, pixelToRemUnit } from '@/shared/styles/util';

export const StyleLoginButton = styled.button<{ name: 'google' | 'kakao' }>`
  position: relative;
  height: 60px;
  width: 100%;
  border-radius: 7px;
  color: #fff;

  ${getStyledThemProperty('fonts', 'body3')};
  ${getStyledThemProperty('box', 'flexCenterBox')};

  ${({ name }) => {
    switch (name) {
      case 'google':
        return css`
          border: 1px solid ${getStyledThemProperty('colors', 'G_500')};
          background-color: #fff;
        `;
      case 'kakao':
        return css`
          border: 1px solid #fae300;
          background-color: #fae300;
          margin-top: 20px;
        `;
    }
  }}

  & > svg {
    position: absolute;
    top: 18px;
    left: ${pixelToRemUnit(28)};
  }
`;

export const LoginButton: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  height: '60px',
};

import { getStyledThemProperty, pixelToRemUnit } from '@/shared/styles/util';
import { ComponentPropsWithoutRef, memo } from 'react';
import styled, { css, DefaultTheme } from 'styled-components';

type ButtonType = ComponentPropsWithoutRef<'button'>;
type Variant = 'accent' | 'primary' | 'secondary' | 'negative';
type FontType = keyof DefaultTheme['fonts'];

interface Props extends ButtonType {
  isActiveFnc?: boolean;
  variant?: Variant;
  font?: FontType;
  width?: number;
  height?: number;
}

const Button = ({
  children,
  isActiveFnc,
  font = 'caption1',
  ...props
}: Props) => {
  return (
    <ButtonStyle font={font} isActiveFnc={isActiveFnc} {...props}>
      {children}
    </ButtonStyle>
  );
};

const ButtonStyle = styled.button<{
  isActiveFnc?: boolean;
  variant?: Variant;
  font?: FontType;
  width?: number;
  height?: number;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;

  width: ${({ width }) => pixelToRemUnit(width ?? 90)};
  height: ${({ height }) => pixelToRemUnit(height ?? 40)};
  ${({ font }) => font && getStyledThemProperty('fonts', font)};

  border: none;
  transition: all 0.1s ease-out 0.02s;
  border-radius: 7px;

  ${({ isActiveFnc }) =>
    isActiveFnc &&
    css`
      border-radius: 50%;
      :active,
      :hover {
        border: 1px solid #dbdbdb;
        border-radius: 50%;
        background: #f3f3f3 !important;
        opacity: 0.8;
        filter: saturate(210%);
      }
    `};

  ${({ variant }) => {
    switch (variant) {
      case 'accent':
        return css`
          color: ${getStyledThemProperty('colors', 'White')};
          background-color: ${getStyledThemProperty('colors', 'main')};
        `;
      case 'primary':
        return css`
          color: ${getStyledThemProperty('colors', 'Black')};
          background-color: ${getStyledThemProperty('colors', 'G_200')};
        `;
      case 'secondary':
        return css`
          color: ${getStyledThemProperty('colors', 'G_700')};
          background-color: ${getStyledThemProperty('colors', 'White')};
          border: 1px solid ${getStyledThemProperty('colors', 'G_300')};
        `;
      default:
        return css`
          color: ${getStyledThemProperty('colors', 'Black')};
          background-color: ${getStyledThemProperty('colors', 'White')};
        `;
    }
  }};

  &:disabled {
    color: ${getStyledThemProperty('colors', 'G_300')};
    background-color: ${getStyledThemProperty('colors', 'main')};
  }
`;

export default memo(Button);

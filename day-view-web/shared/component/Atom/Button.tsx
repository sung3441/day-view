import { getStyledThemProperty, pixelToRemUnit } from '@/shared/styles/util';
import { ComponentPropsWithoutRef, memo } from 'react';
import styled, { css } from 'styled-components';

type ButtonType = ComponentPropsWithoutRef<'button'>;
type Variant = 'accent' | 'primary' | 'secondary' | 'negative';
interface Props extends ButtonType {
  isActiveFnc?: boolean;
  variant?: Variant;
}

const Button = ({ children, isActiveFnc, ...props }: Props) => {
  return (
    <ButtonStyle isActiveFnc={isActiveFnc} {...props}>
      {children}
    </ButtonStyle>
  );
};

const ButtonStyle = styled.button<{ isActiveFnc?: boolean; variant?: Variant }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: ${pixelToRemUnit(90)};
  height: ${pixelToRemUnit(40)};

  /* padding: ${pixelToRemUnit([4, 20])}; */

  background: #ffffff;
  ${getStyledThemProperty('fonts', 'caption1')};
  /* G_300 */
  border: none;
  border-radius: 7px;
  transition: all 0.1s ease-out 0.02s;

  &:disabled {
    color: ${getStyledThemProperty('colors', 'G_300')};
    background-color: ${getStyledThemProperty('colors', 'main')};
  }

  ${({ isActiveFnc }) =>
    isActiveFnc &&
    css`
      :active,
      :hover {
        border: 1px solid #dbdbdb;
        border-radius: 50%;
        background: #f3f3f3 !important;
        opacity: 0.8;
        filter: saturate(210%);
      }
    `}

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
  }}
`;

export default memo(Button);

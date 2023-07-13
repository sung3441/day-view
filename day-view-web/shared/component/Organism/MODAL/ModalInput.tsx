import { ComponentPropsWithRef } from 'react';
import styled, { css } from 'styled-components';
import { getStyledThemProperty, pixelToRemUnit } from '@/shared/styles/util';

type InputType = ComponentPropsWithRef<'input'>;

interface Props extends InputType {
  isValid?: boolean;
  disabled?: boolean;
}

const ModalInput = ({ ...props }: Props) => {
  const { isValid } = props;

  return (
    <S.Wrapper isValid={isValid === undefined ? true : isValid}>
      <S.Input type="text" {...props} />
    </S.Wrapper>
  );
};

export default ModalInput;

const S = {
  Wrapper: styled.div<{ isValid?: boolean }>`
    background: ${({ theme }) => theme.colors.White};

    border: 1px solid ${({ theme }) => theme.colors.G_300};
    border-radius: 7px;

    width: ${pixelToRemUnit(380)};

    padding: ${pixelToRemUnit([8, 18])};

    ${({ isValid }) =>
      isValid
        ? css`
            border-color: ${getStyledThemProperty('colors', 'G_300')};
          `
        : css`
            border-color: ${getStyledThemProperty('colors', 'Red')};
          `};
  `,

  Input: styled.input`
    color: ${({ theme }) => theme.colors.Black};
    ${({ theme }) => theme.fonts.caption2};
    border: none;
    outline: none;

    width: 100%;

    ::placeholder {
      color: ${({ theme }) => theme.colors.G_700};
    }
  `,
};

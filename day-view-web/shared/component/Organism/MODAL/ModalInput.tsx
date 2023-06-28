import { ComponentPropsWithRef } from 'react';
import styled from 'styled-components';
import { pixelToRemUnit } from '@/shared/styles/util';

type InputType = ComponentPropsWithRef<'input'>;

interface Props extends InputType {}

/**
 * TODO: Refactor
 */
const ModalInput = ({ ...props }: Props) => {
  return (
    <S.Wrapper>
      <S.Input type="text" {...props} />
    </S.Wrapper>
  );
};

export default ModalInput;

const S = {
  Wrapper: styled.div`
    background: ${({ theme }) => theme.colors.White};

    border: 1px solid ${({ theme }) => theme.colors.G_300};
    border-radius: 7px;

    width: ${pixelToRemUnit(380)};

    padding: ${pixelToRemUnit([8, 18])};
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

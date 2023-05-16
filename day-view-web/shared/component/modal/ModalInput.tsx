import { ComponentPropsWithRef } from 'react';
import styled from 'styled-components';

type InputType = ComponentPropsWithRef<'input'>;

interface Props extends InputType {}

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

    width: 380px;

    padding: 8px 18px;
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

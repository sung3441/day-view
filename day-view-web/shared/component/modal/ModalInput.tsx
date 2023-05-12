import { ComponentPropsWithoutRef } from 'react';
import styled from 'styled-components';

type InputType = ComponentPropsWithoutRef<'input'>;

interface Props extends InputType {
  subTitle?: string;
}

const ModalInput = ({ subTitle, ...props }: Props) => {
  return (
    <S.Section>
      {subTitle && <S.SubTitle>{subTitle}</S.SubTitle>}
      <S.InputWrapper>
        <S.Input type="text" {...props} />
      </S.InputWrapper>
    </S.Section>
  );
};

export default ModalInput;

const S = {
  Section: styled.section`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;

    width: 100%;
  `,

  SubTitle: styled.div`
    ${({ theme }) => theme.fonts.caption2};
    color: ${({ theme }) => theme.colors.G_700};
  `,

  InputWrapper: styled.div`
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

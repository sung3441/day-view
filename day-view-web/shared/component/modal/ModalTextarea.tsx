import { ComponentPropsWithoutRef } from 'react';
import styled from 'styled-components';

interface Props {
  subTitle?: string;
}

const ModalInput = ({ subTitle }: Props) => {
  return (
    <S.Section>
      {subTitle && <S.SubTitle>{subTitle}</S.SubTitle>}
      <S.Textarea />
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
    align-self: flex-start;
  `,
  Textarea: styled.textarea`
    width: 380px;
    height: 144px;
    padding: 8px 18px;
    resize: none;
    outline: none;

    border: 1px solid ${({ theme }) => theme.colors.G_300};
    border-radius: 7px;

    ${({ theme }) => theme.fonts.caption2};
    color: ${({ theme }) => theme.colors.Black};
  `,
};

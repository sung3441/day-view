import { ComponentPropsWithoutRef, memo } from 'react';
import styled from 'styled-components';

type TextareaType = ComponentPropsWithoutRef<'textarea'>;

interface Props extends TextareaType {
  id?: string;
  disabled?: boolean;
}

const Textarea = ({ id, ...props }: Props) => {
  return <S.Textarea id={id} {...props} />;
};

export default memo(Textarea);

const S = {
  Textarea: styled.textarea`
    width: 100%;
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

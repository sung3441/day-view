import { ComponentPropsWithoutRef } from 'react';
import styled from 'styled-components';

type TextareaType = ComponentPropsWithoutRef<'textarea'>;

interface Props extends TextareaType {
  id?: string;
}

const Textarea = ({ id, ...props }: Props) => {
  return <S.Textarea id={id} {...props} />;
};

export default Textarea;

const S = {
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

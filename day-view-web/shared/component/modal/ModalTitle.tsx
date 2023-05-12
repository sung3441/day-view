import { ComponentPropsWithoutRef } from 'react';
import styled from 'styled-components';

type HeaderType = ComponentPropsWithoutRef<'h2'>;

interface Props extends HeaderType {}

const ModalTitle = ({ children, ...props }: Props) => {
  return <S.Title {...props}>{children}</S.Title>;
};

export default ModalTitle;

const S = {
  Title: styled.h2`
    color: ${({ theme }) => theme.colors.Black};
    ${({ theme }) => theme.fonts.title2};
  `,
};

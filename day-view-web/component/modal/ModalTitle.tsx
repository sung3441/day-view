import { ComponentPropsWithoutRef } from 'react';
import styled from 'styled-components';

type headerType = ComponentPropsWithoutRef<'h2'>;

interface Props extends headerType {}

const ModalTitle = ({ children, ...props }: Props) => {
  return <S.TitleStyle {...props}>{children}</S.TitleStyle>;
};

export default ModalTitle;

const S = {
  TitleStyle: styled.h2`
    color: ${({ theme }) => theme.colors.Black};
    ${({ theme }) => theme.fonts.title2};
  `,
};

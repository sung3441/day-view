import { ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  children?: ReactNode;
}

const ModalControl = ({ children }: Props) => {
  return <S.Control>{children}</S.Control>;
};

export default ModalControl;

const S = {
  Control: styled.section`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 17px;

    width: 100%;
  `,
};

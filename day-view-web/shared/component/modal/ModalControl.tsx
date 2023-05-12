import { ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  children?: ReactNode;
}

const ModalControl = ({ children }: Props) => {
  return <S.Section>{children}</S.Section>;
};

export default ModalControl;

const S = {
  Section: styled.section`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 17px;

    width: 100%;
  `,
};

import styled from 'styled-components';
import { ReactNode, CSSProperties } from 'react';

interface Props {
  children?: ReactNode;
  style?: CSSProperties;
}

const ModalHeader = ({ children, style }: Props) => {
  return <S.Header style={style}>{children}</S.Header>;
};

export default ModalHeader;

const S = {
  Header: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
  `,
};

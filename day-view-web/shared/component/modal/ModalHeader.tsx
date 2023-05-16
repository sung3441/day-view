import { ComponentPropsWithRef } from 'react';
import styled from 'styled-components';

type InputType = ComponentPropsWithRef<'div'>;

interface Props extends InputType {}

const ModalHeader = ({ children }: Props) => {
  return <S.Header>{children}</S.Header>;
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

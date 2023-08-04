import { MouseEventHandler } from 'react';
import styled, { keyframes } from 'styled-components';

interface Props {
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const ModalDim = ({ onClick }: Props) => {
  return <S.Dim onClick={onClick} />;
};

export default ModalDim;

const dimFade = keyframes`
    from {
      opacity: 0;
    }
    to {
      opacity: 0.8;
    }
`;

const S = {
  Dim: styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    background-color: ${({ theme }) => theme.colors.Black};
    animation: ${dimFade} 0.3s ease forwards;
    z-index: 10;
  `,
};

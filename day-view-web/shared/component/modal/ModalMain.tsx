import { ReactNode } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { pixelToRemUnit } from '@/shared/styles/util';

interface Props {
  children?: ReactNode;
  isDimmed?: boolean;
}

const ModalMain = ({ children, isDimmed }: Props) => {
  return (
    <S.Layout>
      <S.Container isDimmed={isDimmed}>{children}</S.Container>
      {isDimmed && <S.Dim />}
    </S.Layout>
  );
};

const dimFade = keyframes`
    from {
      opacity: 0;
    }
    to {
      opacity: 0.8;
    }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-10px);
  }
`;

const S = {
  Layout: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
  `,

  Container: styled.div<{ isDimmed?: boolean }>`
    display: flex;
    flex-direction: column;
    gap: 40px;
    position: relative;

    padding: ${pixelToRemUnit([60, 50])};
    ${({ isDimmed }) =>
      isDimmed
        ? css`
            box-shadow: none;
          `
        : css`
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
          `};

    background-color: ${({ theme }) => theme.colors.White};
    border-radius: 11px;
    z-index: 200;

    animation: ${fadeIn} 0.3s ease forwards;
  `,

  Dim: styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    background-color: ${({ theme }) => theme.colors.Black};
    animation: ${dimFade} 0.3s ease forwards;
  `,
};

export default ModalMain;

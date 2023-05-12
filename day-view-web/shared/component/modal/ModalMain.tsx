import { ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styled, { css } from 'styled-components';

interface Props {
  children?: ReactNode;
  isOpen?: boolean;
  isDimmed?: boolean;
}

const ModalMain = ({ children, isOpen, isDimmed }: Props) => {
  const ref = useRef<Element | null>(null);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
    ref.current = document.querySelector<HTMLElement>('#portal');
  }, []);

  return isMounted && ref.current
    ? createPortal(
        <>
          {isOpen && (
            <S.Layout>
              <S.Container isDimmed={isDimmed}>{children}</S.Container>
              {isDimmed && <S.Dim />}
            </S.Layout>
          )}
        </>,
        ref.current!
      )
    : null;
};

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
    justify-content: space-between;
    align-items: center;
    gap: 22px;

    padding: 60px 50px;

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
  `,
  Dim: styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    background-color: ${({ theme }) => theme.colors.Black};
    opacity: 0.6;
  `,
};

export default ModalMain;

import {
  Children,
  forwardRef,
  isValidElement,
  memo,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled, { css, keyframes } from 'styled-components';
import { pixelToRemUnit } from '@/shared/styles/util';
import { getAdjustPosition } from '@/shared/util/getAdjustPosition';
import { ModalParams } from '@/state/modalState';

import ModalDim from './ModalDim';

interface Props extends ModalParams {
  children?: ReactNode;
  isShow?: boolean;
  onAnimationEnd?: () => void;
}
const FILTER = [(<ModalDim />).type];

const ModalMain = forwardRef<HTMLDivElement, Props>(
  ({ children, ...props }, forwardedRef) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const { clientX, clientY } = props;
    const [position, setPosition] = useState<{ x: number; y: number }>();

    useEffect(() => {
      if (!clientX || !clientY) return;
      const [x, y] = getAdjustPosition(clientX, clientY, containerRef);
      setPosition({ x, y });

      // 화면 크기 변경 시 모달 위치 재조정
      const handleResize = () => {
        const [newX, newY] = getAdjustPosition(x, y, containerRef);
        setPosition({ x: newX, y: newY });
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, [clientX, clientY]);

    /** 컴포넌트 분리 */
    const splitComponents = (children: ReactNode) => {
      const remainComponents: ReactNode[] = [];
      const filteredComponents: ReactNode[] = [];

      Children.forEach(children, (child) => {
        if (isValidElement(child) && FILTER.includes(child.type)) {
          filteredComponents.push(child);
        } else {
          remainComponents.push(child);
        }
      });

      return [remainComponents, filteredComponents];
    };

    const [remainComponents, filteredComponents] = splitComponents(children);

    /** dim 체크 */
    const isDimmed = filteredComponents.some(
      (child) => isValidElement(child) && FILTER.includes(child.type)
    );

    return (
      <S.Layout
        onAnimationEnd={props.onAnimationEnd}
        isShow={props.isShow === undefined ? true : props.isShow}
      >
        <S.Container
          ref={(node) => {
            containerRef.current = node;
            if (forwardedRef && typeof forwardedRef === 'object')
              forwardedRef.current = node;
          }}
          clientX={position && position.x}
          clientY={position && position.y}
          isDimmed={isDimmed}
          isShow={props.isShow === undefined ? true : props.isShow}
        >
          {remainComponents}
        </S.Container>
        {filteredComponents}
      </S.Layout>
    );
  }
);

ModalMain.displayName = 'ModalMain';

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
  Layout: styled.div<{ isShow?: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;

    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;

    ${({ isShow }) =>
      isShow
        ? css`
            animation: ${fadeIn} 0.3s ease forwards;
          `
        : css`
            animation: ${fadeOut} 0.3s ease forwards;
          `};
  `,

  Container: styled.div<{
    isShow?: boolean;
    isDimmed?: boolean;
    clientX?: number;
    clientY?: number;
  }>`
    display: flex;
    flex-direction: column;
    position: absolute;

    padding: ${pixelToRemUnit([60, 50])};

    background-color: ${({ theme }) => theme.colors.White};
    border-radius: 11px;
    z-index: 200;

    ${({ isDimmed }) =>
      isDimmed
        ? css`
            box-shadow: none;
          `
        : css`
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
          `};

    ${({ isShow }) =>
      isShow
        ? css`
            animation: ${fadeIn} 0.3s ease forwards;
          `
        : css`
            animation: ${fadeOut} 0.3s ease forwards;
          `};

    top: ${({ clientY }) => clientY && `${clientY}px`};
    left: ${({ clientX }) => clientX && `${clientX}px`};
    transform: translate(-50%, -50%);

    @media (width <= 600px) {
      width: 100%;
      justify-content: center;
      border-radius: 0;
    }
  `,
};

export default memo(ModalMain);

import { memo, SyntheticEvent } from 'react';
import styled, { css } from 'styled-components';
import { getStyledThemProperty, pixelToRemUnit } from '@/shared/styles/util';
import { fadeIn, fadeOut } from '@/shared/styles/keyframes';
import { useAnimationHandler, useOuterClick } from '@/shared/hooks';
import { colorEntries } from '@/shared/util/colorInfo';
import { Icon } from '@/shared/component/Atom';
import { createPortal } from 'react-dom';

interface Props {
  closeColorBoard({ id }: { id: number }): void;
  isOpen: boolean;
  x: number;
  y: number;
}

const ColorBoard = ({ isOpen, closeColorBoard, x, y }: Props) => {
  const { isShow, handleIsShow, handleOnAnimationEnd } =
    useAnimationHandler(closeColorBoard);

  const ref = useOuterClick<HTMLDivElement>({
    callback: handleIsShow,
  });
  return createPortal(
    <Box
      ref={ref}
      isShow={isShow}
      x={x}
      y={y}
      onAnimationEnd={handleOnAnimationEnd}
    >
      <BoxTitle>
        <Icon type="sm_config" />
        <span>관리</span>
      </BoxTitle>
      <ColorWrap>
        {colorEntries.map(([key, value]) => (
          <ColorCircle key={key} rgb={value} />
        ))}
      </ColorWrap>
    </Box>,
    document.getElementById('box')!
  );
};

export default memo(ColorBoard);

const Box = styled.div<{ isShow: boolean; x: number; y: number }>`
  position: absolute;
  height: 251px;

  top: ${({ y }) => y}px;
  left: ${({ x }) => x}px;
  z-index: 55555;
  width: 140px;

  border: 1px solid rgba(219, 219, 219, 1);
  border-radius: 11px;
  background-color: #fff;

  ${({ isShow }) =>
    isShow
      ? css`
          animation: ${fadeIn} 0.15s ease-in-out 0s forwards;
        `
      : css`
          animation: ${fadeOut} 0.15s ease-in-out 0s forwards;
        `}
`;

const BoxTitle = styled.div`
  border-bottom: 1px solid #d9d9d9;
  padding: 10px;

  ${getStyledThemProperty('box', 'flexBetweenBox')};

  > span {
    margin-left: ${pixelToRemUnit(7)};
    ${getStyledThemProperty('fonts', 'caption3')};
  }
`;

const ColorWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  padding: 10px;
  gap: 12px;
`;

const ColorCircle = styled.span<{ rgb: string }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${({ rgb }) => rgb};

  :hover {
    transform: scale(1.1);
  }
`;

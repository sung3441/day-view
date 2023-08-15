import { memo, SyntheticEvent, useMemo } from 'react';
import styled, { css } from 'styled-components';
import { getStyledThemProperty, pixelToRemUnit } from '@/shared/styles/util';
import { fadeIn, fadeOut } from '@/shared/styles/keyframes';
import { useAnimationHandler, useModal, useOuterClick } from '@/shared/hooks';
import { colorEntries } from '@/shared/util/colorInfo';
import { Icon } from '@/shared/component/Atom';
import { createPortal } from 'react-dom';
import { COLOR_BOX_HEIGHT } from '@/shared/constant/calendar';
import { ChannelSelectType } from '@/shared/types/api';
import { ChannelColorInfoType } from '@/state/channel';
import ChannelConfigs from '@/component/channel/ChannelConfigs';

interface Props {
  channelId: number;
  subscribeId: number;
  selectType: ChannelSelectType;
  channelColorInfo: ChannelColorInfoType;
  name: string;
  showYn: boolean;
  closeColorBoard({ id }: { id: number }): void;
  handelMutateChannelInfo(
    channelId: number,
    color: string,
    showYn: boolean
  ): void;
}

const ColorBoard = ({
  channelId,
  selectType,
  subscribeId,
  name,
  showYn,
  channelColorInfo: { x, y },
  closeColorBoard,
  handelMutateChannelInfo,
}: Props) => {
  const { isShow, handleIsShow, handleOnAnimationEnd } =
    useAnimationHandler(closeColorBoard);
  const ref = useOuterClick<HTMLDivElement>({
    callback: handleIsShow,
  });

  const handleColorChange = (color: string) => {
    handelMutateChannelInfo(subscribeId, color, showYn);
    handleIsShow();
  };

  return createPortal(
    <Box
      ref={ref}
      isShow={isShow}
      x={x}
      y={y}
      onAnimationEnd={handleOnAnimationEnd}
    >
      <ChannelConfigs
        channelId={channelId}
        subscribeId={subscribeId}
        selectType={selectType}
        name={name}
        handleIsShow={handleIsShow}
      />
      <ColorWrap>
        {colorEntries.map(([key, value]) => (
          <ColorCircle
            key={key}
            rgb={value}
            onClick={() => handleColorChange(value)}
          />
        ))}
      </ColorWrap>
    </Box>,
    document.getElementById('box')!
  );
};

export default memo(ColorBoard);

const Box = styled.div<{ isShow: boolean; x: number; y: number }>`
  position: absolute;
  height: ${COLOR_BOX_HEIGHT}px;
  overflow: hidden;

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

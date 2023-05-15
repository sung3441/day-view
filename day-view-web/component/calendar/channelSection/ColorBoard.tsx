import { memo } from 'react';
import styled, { css } from 'styled-components';
import { Icon } from '@/shared/component/Atom';
import { getStyledThemProperty, pixelToRemUnit } from '@/shared/styles/util';
import { fadeIn, fadeOut } from '@/shared/styles/keyframes';
import { useAnimationHandler, useOuterClick } from '@/shared/hooks';
import { colorEntries } from '@/shared/util/colorInfo';

interface Props {
  closeColorBoard: () => void;
  isOpen: boolean;
}

const ColorBoard = ({ isOpen, closeColorBoard }: Props) => {
  const { isShow, handleIsShow, handelOnAnimationEnd } =
    useAnimationHandler(closeColorBoard);
  const ref = useOuterClick<HTMLDivElement>({
    callback: handleIsShow,
  });

  return (
    <Box ref={ref} isShow={isShow} onAnimationEnd={handelOnAnimationEnd}>
      <BoxTitle>
        <Icon type="sm_config" iconSize="sm" />
        <span>관리</span>
      </BoxTitle>
      <ColorWrap>
        {colorEntries.map(([key, value]) => (
          <ColorCircle key={key} rgb={value} />
        ))}
      </ColorWrap>
    </Box>
  );
};

export default memo(ColorBoard);

const Box = styled.div<{ isShow: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
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
  border-bottom: 1px solid #D9D9D9;
  padding: ${pixelToRemUnit(10)};

  ${getStyledThemProperty('box', 'flexBetweenBox')};
  > span {
    margin-left: ${pixelToRemUnit(7)};
    ${getStyledThemProperty('fonts', 'caption3')};
`;

const ColorWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  padding: ${pixelToRemUnit(10)};
  gap: 12px;
`;

const ColorCircle = styled.span<{ rgb: string }>`
  // width: ${pixelToRemUnit(20)};
  // height: ${pixelToRemUnit(20)};
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${({ rgb }) => rgb};

  :hover {
    transform: scale(1.1);
  }
`;

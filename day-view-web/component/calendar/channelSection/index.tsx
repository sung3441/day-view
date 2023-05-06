import { memo } from 'react';
import styled, { css } from 'styled-components';
import { pixelToRemUnit } from '@/shared/util/common';
import { useRecoilValue } from 'recoil';
import { G_isOpenChannel } from '@/shared/atom/globalCalendar';

const Channel = () => {
  const isOpenChannel = useRecoilValue(G_isOpenChannel);

  // if (!isOpenChannel) return null;
  return <Wrap isOpenChannel={isOpenChannel}>dada</Wrap>;
};

export default memo(Channel);

const Wrap = styled.div<{ isOpenChannel: boolean }>`
  position: absolute;
  width: ${pixelToRemUnit(373)};
  height: 100%;
  background-color: #fcfcfc;

  transition: all 0.3s ease-out 0.05s;

  ${({ isOpenChannel }) =>
    !isOpenChannel &&
    css`
      width: 0;
    `}
`;

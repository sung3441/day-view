import { memo } from 'react';
import styled, { css } from 'styled-components';
import { pixelToRemUnit } from '@/shared/util/common';
import { useRecoilValue } from 'recoil';
import { G_isOpenChannel } from '@/shared/atom/globalCalendar';
import { Button } from '@/shared/component/Atom';
import Channel from '@/component/calendar/channelSection/Channel';

const ChannelSection = () => {
  const isOpenChannel = useRecoilValue(G_isOpenChannel);
  return (
    <Wrap isOpenChannel={isOpenChannel}>
      <Channel label="내채널" />
      <Button>321</Button>
    </Wrap>
  );
};

export default memo(ChannelSection);

const Wrap = styled.div<{ isOpenChannel: boolean }>`
  position: absolute;
  width: ${pixelToRemUnit(373)};
  height: 100%;
  padding: ${pixelToRemUnit([32, 28])};

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  //align-items: center;

  background-color: #fcfcfc;
  border-right: 1px solid #dbdbdb;

  transition: all 0.3s ease-out 0.05s;
  ${({ isOpenChannel }) =>
    !isOpenChannel &&
    css`
      width: 0;
      display: none;
    `}
`;

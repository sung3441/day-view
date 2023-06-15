import { CSSProperties, memo } from 'react';
import styled, { css } from 'styled-components';
import { useRecoilValue } from 'recoil';
import { G_isOpenChannelAtom } from '@/shared/atom/globalCalendar';
import Channel from '@/component/calendar/channelSection/Channel';
import { Button, Icon } from '@/shared/component/Atom';
import { pixelToRemUnit } from '@/shared/styles/util';
import { useModal } from '@/shared/hooks';

const buttonStyle: CSSProperties = {
  width: pixelToRemUnit(323),
  height: pixelToRemUnit(60),
  background: '#FF836D',
  borderRadius: '7px',
  color: '#FFFFFF',
};

const ChannelSection = () => {
  const isOpenChannel = useRecoilValue(G_isOpenChannelAtom);
  const { openModal } = useModal();

  return (
    <Wrap isOpenChannel={isOpenChannel}>
      <Channel label="내채널" />
      <Button style={buttonStyle} onClick={() => openModal('AddSchedule')}>
        <Icon type="sm_plus" style={{ marginRight: '5px' }} />
        <span>일정추가</span>
      </Button>
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

  background-color: #fcfcfc;
  border-right: 1px solid #dbdbdb;

  transition: all 0.3s ease-out 0.05s;

  ${({ isOpenChannel }) =>
    isOpenChannel
      ? css`
          transform: translateX(0);
        `
      : css`
          transform: translateX(${pixelToRemUnit(-373)});
        `}
`;

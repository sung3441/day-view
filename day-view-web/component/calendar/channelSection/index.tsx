import { CSSProperties, memo } from 'react';
import styled, { css } from 'styled-components';
import { useRecoilValue } from 'recoil';
import Channel from '@/component/calendar/channelSection/Channel';
import { Button, Icon } from '@/shared/component/Atom';
import { pixelToRemUnit } from '@/shared/styles/util';
import { useModal } from '@/shared/hooks';
import { type Props as ChannelInfoType } from './Channel';
import { G_isOpenChannelAtom } from '@/shared/component/Organism/GNB/state';

const buttonStyle: CSSProperties = {
  width: pixelToRemUnit(323),
  height: pixelToRemUnit(60),
  background: '#FF836D',
  borderRadius: '7px',
  color: '#FFFFFF',
};

const channelInfo: ChannelInfoType[] = [
  { label: '내 채널', selectType: 'MANAGE' },
  { label: '구독 채널', selectType: 'SUBSCRIBE' },
  { label: '구글 채널', selectType: 'GOOGLE' },
];

const ChannelSection = () => {
  const isOpenChannel = useRecoilValue(G_isOpenChannelAtom);
  const { openModal } = useModal();

  return (
    <Wrap isOpenChannel={isOpenChannel}>
      {channelInfo.map((info) => (
        <Channel key={info.label} {...info} />
      ))}
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
  overflow-x: auto;
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }

  z-index: 1;

  width: ${pixelToRemUnit(373)};
  height: 100%;
  padding: ${pixelToRemUnit([32, 28])};

  display: flex;
  flex-direction: column;

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

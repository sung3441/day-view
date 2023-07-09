import { CSSProperties, memo, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useRecoilValue } from 'recoil';
import Channel from '@/component/calendar/channelSection/Channel';
import { Button, Icon } from '@/shared/component/Atom';
import { pixelToRemUnit } from '@/shared/styles/util';
import { useModal } from '@/shared/hooks';
import { type Props as ChannelInfoType } from './Channel';
import { G_isOpenChannelAtom } from '@/shared/component/Organism/GNB/state';
import { channelColorIdAtom } from '@/state/channel';
import useColorBoxControl from '@/component/calendar/hooks/useColorBoxControl';

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
  const { channelColor, closeColorBox } = useColorBoxControl();

  useEffect(() => {
    if (channelColor.id) window.addEventListener('resize', closeColorBox);
    return () => window.removeEventListener('resize', closeColorBox);
  }, [channelColor]);

  return (
    <Wrap isOpenChannel={isOpenChannel} onScroll={closeColorBox}>
      <Inner>
        {channelInfo.map((info) => (
          <Channel key={info.label} {...info} />
        ))}
        <Button style={buttonStyle} onClick={() => openModal('AddSchedule')}>
          <Icon type="sm_plus" style={{ marginRight: '5px' }} />
          <span>일정추가</span>
        </Button>
      </Inner>
    </Wrap>
  );
};

export default memo(ChannelSection);

const Wrap = styled.div<{ isOpenChannel: boolean }>`
  position: absolute;
  z-index: 1;
  overflow: auto;

  width: ${pixelToRemUnit(373)};
  height: 100%;

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
        `};
`;

const Inner = styled.div`
  height: auto;
  width: 100%;
  overflow: visible;
  z-index: 2;

  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;

  padding: ${pixelToRemUnit([32, 28])};
`;

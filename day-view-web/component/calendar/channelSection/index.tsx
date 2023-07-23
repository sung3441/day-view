import { CSSProperties, memo, useEffect, useMemo } from 'react';
import styled, { css } from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Channel from '@/component/calendar/channelSection/Channel';
import { Button, Icon } from '@/shared/component/Atom';
import { pixelToRemUnit } from '@/shared/styles/util';
import { useModal } from '@/shared/hooks';
import { type Props as ChannelInfoType } from './Channel';
import {
  G_isOpenChannelAtom,
  G_isSearchOpenAtom,
} from '@/shared/component/Organism/GNB/state';
import useColorBoxControl from '@/component/calendar/hooks/useColorBoxControl';

const buttonStyle: CSSProperties = {
  width: pixelToRemUnit(323),
  height: pixelToRemUnit(60),
  background: '#FF836D',
  borderRadius: '7px',
  color: '#FFFFFF',
};

const ChannelSection = () => {
  const isOpenChannel = useRecoilValue(G_isOpenChannelAtom);
  const setISearchOpen = useSetRecoilState(G_isSearchOpenAtom);

  const { openModal } = useModal();
  const { closeColorBox } = useColorBoxControl({ isRequiredEffect: true });

  const channelInfo: ChannelInfoType[] = useMemo(
    () => [
      {
        label: '내 채널',
        selectType: 'MANAGE',
        onClickPlus: () => openModal('CreateChannel'),
      },
      {
        label: '구독 채널',
        selectType: 'SUBSCRIBE',
        onClickPlus: () => setISearchOpen((prev) => !prev),
      },
      { label: '구글 채널', selectType: 'GOOGLE' },
    ],
    []
  );

  return (
    <Wrapper isOpenChannel={isOpenChannel} onScroll={closeColorBox}>
      <Inner>
        {channelInfo.map((info) => (
          <Channel key={info.label} {...info} />
        ))}
        <Button style={buttonStyle} onClick={() => openModal('AddSchedule')}>
          <Icon type="sm_plus" style={{ marginRight: '5px' }} />
          <span>일정추가</span>
        </Button>
      </Inner>
    </Wrapper>
  );
};

export default memo(ChannelSection);

const Wrapper = styled.div<{ isOpenChannel: boolean }>`
  position: absolute;
  overflow: scroll;

  width: ${pixelToRemUnit(373)};
  height: calc(100% - 100px);

  background-color: #fcfcfc;
  border-right: 1px solid #dbdbdb;
  transition: all 0.3s ease-out 0.05s;

  padding: ${pixelToRemUnit([32, 28])};

  ::-webkit-scrollbar {
    display: none;
  }

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
  width: 100%;

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

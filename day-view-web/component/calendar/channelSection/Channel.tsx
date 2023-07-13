import styled, { css } from 'styled-components';
import { memo, SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { IconButton } from '@/shared/component/Molecule';
import { pixelToRemUnit } from '@/shared/styles/util';
import dynamic from 'next/dynamic';
import { useModal } from '@/shared/hooks';
import { ChannelSelectType } from '@/shared/types/api';
import useGetChannel from '@/component/calendar/hooks/useGetChannel';
import ChannelItem from '@/component/calendar/channelSection/ChannelItem';
import { useRecoilValue } from 'recoil';
import { channelColorIdAtom } from '@/state/channel';
import useColorBoxControl from '@/component/calendar/hooks/useColorBoxControl';

export interface Props {
  label: string;
  selectType: ChannelSelectType;
}

const Channel = ({ label, selectType }: Props) => {
  const channelColorId = useRecoilValue(channelColorIdAtom);
  const { openModal } = useModal();
  const { toggleChannelColor } = useColorBoxControl();

  const { status, data } = useGetChannel({ selectType });

  if (status !== 'success') return null;
  return (
    <div>
      <Label>
        <span>{label}</span>
        <IconButton
          type="sm_plus"
          size="small"
          onClick={() => openModal('CreateChannel')}
        />
      </Label>
      <List>
        {status === 'success' &&
          data?.data?.map((channel, index) => (
            <ChannelItem
              key={channel.channelId}
              toggleChannelColor={toggleChannelColor}
              isOpen={channel.channelId === channelColorId.id}
              x={channelColorId.x}
              y={channelColorId.y}
              {...channel}
            />
          ))}
      </List>
    </div>
  );
};

export default memo(Channel);

const Label = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  > span {
    ${({ theme }) => css`
      ${theme.fonts.title2}
    `}
  }
`;

const List = styled.ul`
  padding: ${pixelToRemUnit([30, 6])};
`;

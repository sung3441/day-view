import styled, { css } from 'styled-components';
import { memo } from 'react';
import { IconButton } from '@/shared/component/Molecule';
import { pixelToRemUnit } from '@/shared/styles/util';
import dynamic from 'next/dynamic';
import { useModal } from '@/shared/hooks';
import { ChannelSelectType } from '@/shared/types/api';
import useGetChannel from '@/component/calendar/channelSection/hooks/useGetChannel';
import ChannelItem from '@/component/calendar/channelSection/ChannelItem';

export interface Props {
  label: string;
  selectType: ChannelSelectType;
}

const Channel = ({ label, selectType }: Props) => {
  const { openModal } = useModal();
  const { status, data } = useGetChannel({ selectType });

  if (status !== 'success') return null;
  return (
    <Wrap>
      <Label>
        <span>{label}</span>
        <IconButton
          type="sm_plus"
          size="small"
          onClick={() => openModal('CreateCategory')}
        />
      </Label>
      <List>
        {status === 'success' &&
          data?.data?.map((channel, index) => (
            <ChannelItem key={channel.channelId} {...channel} />
          ))}
      </List>
    </Wrap>
  );
};

export default memo(Channel);

const Wrap = styled.div`
  & + & {
    //margin-top: ${pixelToRemUnit(60)};
  }
`;

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
  display: flex;
  flex-direction: column;
`;

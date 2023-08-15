import styled, { css } from 'styled-components';
import { memo } from 'react';
import { IconButton } from '@/shared/component/Molecule';
import { pixelToRemUnit } from '@/shared/styles/util';
import { ChannelSelectType } from '@/shared/types/api';
import useGetChannel from '@/shared/context/channel/hooks/useGetChannel';
import ChannelItem from '@/component/channel/ChannelItem';
import { useRecoilValue } from 'recoil';
import { channelColorInfoAtom } from '@/state/channel';
import useColorBoxControl from '@/shared/context/channel/hooks/useColorBoxControl';
import usePatchChannelInfo from '@/shared/context/channel/hooks/usePatchChannelInfo';

export interface Props {
  label: string;
  selectType: ChannelSelectType;
  onClickPlus?(): void;
}

const Channel = ({ label, selectType, onClickPlus }: Props) => {
  const channelColorInfo = useRecoilValue(channelColorInfoAtom);
  const { toggleChannelColor } = useColorBoxControl();

  const { status, data } = useGetChannel({ selectType });
  const { handelMutateChannelInfo } = usePatchChannelInfo(selectType);

  if (status !== 'success') return null;
  return (
    <div>
      <Label>
        <span>{label}</span>
        <IconButton type="sm_plus" size="small" onClick={onClickPlus} />
      </Label>
      <List>
        {data?.data?.map((channel) => (
          <ChannelItem
            key={channel.channelId}
            selectType={selectType}
            channelColorInfo={channelColorInfo}
            isOpen={channelColorInfo.id === channel.channelId}
            handelMutateChannelInfo={handelMutateChannelInfo}
            toggleChannelColor={toggleChannelColor}
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

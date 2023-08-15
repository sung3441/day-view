import { CheckBox, IconButton } from '@/shared/component/Molecule';
import ColorBoard from '@/component/channel/ColorBoard';
import { ChangeEvent, memo, SyntheticEvent } from 'react';
import styled, { css } from 'styled-components';
import { ChannelRes } from '@/shared/types/api';

interface Props extends ChannelRes {
  isOpen: boolean;
  x: number;
  y: number;
  toggleChannelColor({ id }: { id: number }, e?: SyntheticEvent): void;
  handelMutateChannelInfo(
    channelId: number,
    color: string,
    showYn: boolean
  ): void;
}

const ChannelItem = ({
  isOpen,
  x,
  y,
  channelId,
  channelType,
  name,
  color,
  subscribeId,
  subscribeAuth,
  showYn,
  handelMutateChannelInfo,
  toggleChannelColor,
}: Props) => {
  const handleIsShowChange = (e: ChangeEvent<HTMLInputElement>) => {
    handelMutateChannelInfo(channelId, color, e.target.checked);
  };

  return (
    <>
      <Item id={`channel${channelId.toString()}`}>
        <CheckBox
          id={name}
          color={color}
          label={name}
          onChange={(e) => handleIsShowChange(e)}
          checked={showYn}
        />
        <IconButton
          type="sm_more"
          size="small"
          onClick={(e?: SyntheticEvent) =>
            toggleChannelColor({ id: channelId }, e)
          }
        />
      </Item>
      {isOpen && (
        <ColorBoard
          name={name}
          channelId={channelId}
          isOpen={isOpen}
          x={x}
          y={y}
          showYn={showYn}
          closeColorBoard={() => toggleChannelColor({ id: 0 })}
          handelMutateChannelInfo={handelMutateChannelInfo}
        />
      )}
    </>
  );
};

export default memo(ChannelItem);

const Item = styled.li`
  position: relative;
  ${({ theme }) =>
    css`
      ${theme.box.flexBetweenBox}
    `}
`;

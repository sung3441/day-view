import { CheckBox, IconButton } from '@/shared/component/Molecule';
import ColorBoard from '@/component/calendar/channelSection/ColorBoard';
import { memo, SyntheticEvent } from 'react';
import styled, { css } from 'styled-components';
import { ChannelRes } from '@/shared/types/api';

interface Props extends ChannelRes {
  isOpen: boolean;
  x: number;
  y: number;
  toggleChannelColor({ id }: { id: number }, e?: SyntheticEvent): void;
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
  toggleChannelColor,
}: Props) => {
  return (
    <>
      <Item id={`channel${channelId.toString()}`}>
        <CheckBox id={name} label={name} />
        <div
          onClick={(e: SyntheticEvent) =>
            toggleChannelColor({ id: channelId }, e)
          }
          style={{ position: 'relative' }}
        >
          <IconButton type="sm_more" size="small" />
        </div>
      </Item>
      {isOpen && (
        <ColorBoard
          name={name}
          channelId={channelId}
          isOpen={isOpen}
          closeColorBoard={() => toggleChannelColor({ id: 0 })}
          x={x}
          y={y}
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

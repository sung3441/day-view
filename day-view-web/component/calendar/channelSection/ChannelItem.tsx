import { CheckBox, IconButton } from '@/shared/component/Molecule';
import ColorBoard from '@/component/calendar/channelSection/ColorBoard';
import { memo, SyntheticEvent, useState } from 'react';
import styled, { css } from 'styled-components';
import { ChannelRes } from '@/shared/types/api';

interface Props extends ChannelRes {}

const ChannelItem = ({
  channelId,
  channelType,
  name,
  color,
  subscribeId,
  subscribeAuth,
  showYn,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = (e: SyntheticEvent) => {
    e.stopPropagation();
    setIsOpen(true);
  };

  return (
    <Item>
      <CheckBox id={name} label={name} />
      <div style={{ position: 'relative' }}>
        <IconButton type="sm_more" size="small" onClick={handleOpen} />
        {isOpen && (
          <ColorBoard
            isOpen={isOpen}
            closeColorBoard={() => setIsOpen(false)}
          />
        )}
      </div>
    </Item>
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

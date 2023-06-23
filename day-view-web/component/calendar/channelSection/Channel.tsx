import styled, { css } from 'styled-components';
import { memo, SyntheticEvent, useState } from 'react';
import { CheckBox, IconButton } from '@/shared/component/Molecule';
import { pixelToRemUnit } from '@/shared/styles/util';
import dynamic from 'next/dynamic';
import { useModal } from '@/shared/hooks';
import { ChannelSelectType } from '@/shared/types/api';
import useGetChannel from '@/component/calendar/channelSection/hooks/useGetChannel';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
// import ColorBoard from '@/component/calendar/channelSection/ColorBoard';

const ColorBoard = dynamic(
  () => import('@/component/calendar/channelSection/ColorBoard'),
  { ssr: false }
);
export interface Props {
  label: string;
  selectType: ChannelSelectType;
}

const Channel = ({ label, selectType }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { openModal } = useModal();

  const { status, data } = useGetChannel({ selectType });

  const handleOpen = (e: SyntheticEvent) => {
    e.stopPropagation();
    setIsOpen(true);
  };

  if (status === 'error') return null;
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
        <Item>
          <CheckBox id="test" label="test" />
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
      </List>
    </Wrap>
  );
};

export default memo(Channel);

const Wrap = styled.div`
  & + & {
    margin-top: ${pixelToRemUnit(60)};
  }
`;

const Label = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  //margin-bottom: ${pixelToRemUnit(24)};

  > span {
    ${({ theme }) => css`
      ${theme.fonts.title2}
    `}
  }
`;

const List = styled.ul`
  padding: ${pixelToRemUnit([30, 6])};
`;

const Item = styled.li`
  position: relative;
  ${({ theme }) =>
    css`
      ${theme.box.flexBetweenBox}
    `}
`;

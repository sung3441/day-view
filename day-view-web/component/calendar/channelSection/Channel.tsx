import styled, { css } from 'styled-components';
import { memo, SyntheticEvent, useState } from 'react';
import { CheckBox, IconButton } from '@/shared/component/Molecule';
import { pixelToRemUnit } from '@/shared/styles/util';
import dynamic from 'next/dynamic';
import { useModal } from '@/shared/hooks';
// import ColorBoard from '@/component/calendar/channelSection/ColorBoard';

const ColorBoard = dynamic(
  () => import('@/component/calendar/channelSection/ColorBoard'),
  { ssr: false }
);
interface Props {
  label: string;
}

const Channel = ({ label }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { openModal } = useModal();

  const handelOpen = (e: SyntheticEvent) => {
    e.stopPropagation();
    setIsOpen(true);
  };

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
            <IconButton type="sm_more" size="small" onClick={handelOpen} />
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

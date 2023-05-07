import styled, { css } from 'styled-components';
import { pixelToRemUnit } from '@/shared/util/common';
import { memo } from 'react';

interface Props {
  label: string;

  // handelClickLabel: () => void;
}

const Channel = ({ label }: Props) => {
  return (
    <Wrap>
      <Label>
        <span>{label}</span>
      </Label>
      <List>
        <Item>11</Item>
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

const Item = styled.li``;

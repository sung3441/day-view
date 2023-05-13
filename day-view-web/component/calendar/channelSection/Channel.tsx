import styled, { css } from 'styled-components';
import { pixelToRemUnit } from '@/shared/util/common';
import { memo } from 'react';
import { IconButton } from '@/shared/component/Molecule';

interface Props {
  label: string;

  // handelClickLabel: () => void;
}

const Channel = ({ label }: Props) => {
  return (
    <Wrap>
      <Label>
        <span>{label}</span>
        <IconButton type="sm_plus" iconSize="sm" />
      </Label>
      <List>
        <Item>
          {/*https://okayoon.tistory.com/entry/input-%ED%83%9C%EA%B7%B8-%ED%83%80%EC%9E%85-checkbox-radio-%EC%8A%A4%ED%83%80%EC%9D%BC-%EC%BB%A4%EC%8A%A4%ED%85%80%ED%95%98%EA%B8%B0*/}
          <input type="checkbox" />
          {/*<CheckBox label="test" />*/}
          <IconButton type="sm_more" iconSize="sm" />
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

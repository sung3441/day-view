import { memo } from 'react';
import styled from 'styled-components';
import { getStyledThemProperty } from '@/shared/styles/util';
import { IconButton } from '@/shared/component/Molecule';

interface Props {
  year: number;
  month: number;
  handleMoveMonth: (flag: 'prev' | 'next') => void;
}
const Header = ({ year, month, handleMoveMonth }: Props) => {
  return (
    <Wrapper>
      <CalendarLabel>
        {year}년 {month}월
      </CalendarLabel>
      <RightBox>
        <IconButton
          type="left"
          size="small"
          onClick={() => handleMoveMonth('prev')}
        />
        <IconButton
          type="right"
          size="small"
          onClick={() => handleMoveMonth('next')}
        />
      </RightBox>
    </Wrapper>
  );
};
export default memo(Header);

const Wrapper = styled.div`
  ${getStyledThemProperty('box', 'flexBetweenBox')};
  height: 40px;
  padding: 8px 12px;
`;

const CalendarLabel = styled.div`
  ${getStyledThemProperty('fonts', 'caption1')}
`;

const RightBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  > * {
    margin-left: 16px;
  }
`;

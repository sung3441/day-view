import { memo } from 'react';
import styled from 'styled-components';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { selectedDayAtom, selectedYYMMAtom } from '@/state/calendar';
import { IconButton } from '@/shared/component/Molecule';

interface Props {
  handleMoveMonth: (flag: 'prev' | 'next') => void;
}

const DateHeader = ({ handleMoveMonth }: Props) => {
  const { year, month } = useRecoilValue(selectedYYMMAtom);
  const resetYYMM = useResetRecoilState(selectedYYMMAtom);
  const resetDay = useResetRecoilState(selectedDayAtom);

  const handelClickToday = () => {
    resetYYMM();
    resetDay();
  };

  return (
    <Wrap>
      <CalendarLabel>
        {year}년 {month}월
      </CalendarLabel>
      <RightBox>
        <IconButton type="left" onClick={() => handleMoveMonth('prev')} />
        <TodayButton onClick={() => handelClickToday()}>오늘</TodayButton>
        <IconButton type="right" onClick={() => handleMoveMonth('next')} />
      </RightBox>
    </Wrap>
  );
};

export default memo(DateHeader);

const Wrap = styled.div`
  width: 100%;
  height: 76px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 17px 40px;
  border-bottom: 1px solid #dbdbdb;
`;

const CalendarLabel = styled.div`
  font-weight: 500;
  font-size: 32px;
  color: #222;
`;

const TodayButton = styled.button`
  width: 90px;
  height: 40px;

  border: 1px solid #dbdbdb;
  border-radius: 7px;
  background-color: #fff;

  :active {
    transform: translateY(1px);
    opacity: 0.9;
  }
`;

const RightBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  > * {
    margin-left: 16px;
  }
`;

import { memo } from 'react';
import styled from 'styled-components';
import { YYMMType } from '@/shared/types/calendar';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { selectedDayAtom, selectedYYMMAtom, todayAtom } from '@/state/calendar';
import { IconButton } from '@/shared/component/Molecule';

interface Props {}

const CalendarHeader = ({}: Props) => {
  const [selectedYYMM, setSelectedYYMM] = useRecoilState(selectedYYMMAtom);
  const resetYYMM = useResetRecoilState(selectedYYMMAtom);
  const resetDay = useResetRecoilState(selectedDayAtom);

  const handleMoveMonth = (flag: 'prev' | 'next') => {
    let { year, month } = selectedYYMM;
    month = flag === 'prev' ? --month : ++month;
    const d = new Date(year, month, 0);
    setSelectedYYMM({ year: d.getFullYear(), month: d.getMonth() + 1 });
  };

  const handelClickToday = () => {
    resetYYMM();
    resetDay();
  };

  return (
    <Wrap>
      <CalendarLabel>
        {selectedYYMM.year}년 {selectedYYMM.month}월
      </CalendarLabel>
      <RightBox>
        <IconButton type="left" onClick={() => handleMoveMonth('prev')} />
        <TodayButton onClick={() => handelClickToday()}>오늘</TodayButton>
        <IconButton type="right" onClick={() => handleMoveMonth('next')} />
      </RightBox>
    </Wrap>
  );
};

export default memo(CalendarHeader);

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

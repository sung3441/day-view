import { memo } from 'react';
import styled from 'styled-components';
import { YYMMType } from '@/shared/types/calendar';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { selectedDayAtom, selectedYYMMAtom, todayAtom } from '@/state/calendar';

interface Props {
  selectedYYMM: YYMMType;
  handleMoveMonth: (flag: 'prev' | 'next') => void;
}

const CalendarHeader = ({ selectedYYMM, handleMoveMonth }: Props) => {
  const resetYYMM = useResetRecoilState(selectedYYMMAtom);
  const resetDay = useResetRecoilState(selectedDayAtom);

  const handelClickToday = () => {
    resetYYMM();
    resetDay();
  };

  return (
    <Wrap>
      <div></div>
      <div>
        <div>
          {selectedYYMM.year}년{selectedYYMM.month}월
        </div>
        <button onClick={() => handleMoveMonth('prev')}>이전</button>
        <button onClick={() => handleMoveMonth('next')}>다음</button>
        <button onClick={handelClickToday}>오늘</button>
      </div>
    </Wrap>
  );
};

export default memo(CalendarHeader);

const Wrap = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0.5rem;

  & > div {
    display: flex;
    align-items: center;
    gap: 12px;
  }
`;

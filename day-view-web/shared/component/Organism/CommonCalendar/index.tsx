import { memo, useEffect, useState } from 'react';
import Header from '@/shared/component/Organism/CommonCalendar/header';
import Labels from '@/shared/component/Organism/CommonCalendar/label';
import styled from 'styled-components';
import Dates from '@/shared/component/Organism/CommonCalendar/Dates';
import { getTodayYYMM } from '@/shared/context/date/util';
import useOuterClick from '../../../hooks/useOuterClick';

type Props = {
  onlyStart?: boolean;
  onSelectDay?: (startDate: string, endDate?: string) => void;
  closeCalendar: () => void;
};

const toNumber = (date: string) => +date.split('-').join('');
const Calendar = ({ onlyStart, onSelectDay, closeCalendar }: Props) => {
  const [selectedYYMM, setSelectedYYMM] = useState(getTodayYYMM());
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const targetRef = useOuterClick<HTMLDivElement>({
    callback: () => closeCalendar(),
  });

  const handleMoveMonth = (flag: 'prev' | 'next') => {
    let { year, month } = selectedYYMM;
    month = flag === 'prev' ? --month : ++month;
    const d = new Date(year, month, 0);
    setSelectedYYMM({ year: d.getFullYear(), month: d.getMonth() + 1 });
  };

  const covertSet = (date: string) => {
    setStartDate(date);
    setEndDate(startDate);
  };

  const handleSelectDay = (date: string) => {
    console.log('handleSelectDay');
    if (startDate === '') {
      setStartDate(date);
      return;
    }

    if (endDate === '') {
      if (toNumber(date) < toNumber(startDate)) {
        covertSet(date);
        return;
      }
      setEndDate(date);
      return;
    }

    setStartDate(date);
    setEndDate('');
  };

  const isRangeDay = (date: string) => {
    if (startDate === '' || endDate === '') {
      return false;
    }

    const currDate = toNumber(date);
    const startDateNum = toNumber(startDate);
    const endDateNum = toNumber(endDate);
    return startDateNum <= currDate && currDate <= endDateNum;
  };

  useEffect(() => {
    onSelectDay && onSelectDay(startDate, endDate);
  }, [startDate, endDate]);

  useEffect(() => {
    if (onlyStart && startDate) closeCalendar();
    if (!onlyStart && startDate && endDate) closeCalendar();
  }, [onlyStart, startDate, endDate]);

  return (
    <Wrapper ref={targetRef}>
      <Header handleMoveMonth={handleMoveMonth} {...selectedYYMM} />
      <DateWrapper>
        <Labels />
        <Dates
          year={selectedYYMM.year}
          month={selectedYYMM.month}
          handleSelectDay={handleSelectDay}
          startDate={startDate}
          endDate={endDate}
          isRangeDay={isRangeDay}
        />
      </DateWrapper>
    </Wrapper>
  );
};

export default memo(Calendar);

const Wrapper = styled.div`
  z-index: 99;
  position: absolute;
  left: 0;
  top: 0;
  width: auto !important;
  height: auto;
  overflow: hidden;
  border: 1px solid #dbdbdb;
  border-radius: 12px;
  background-color: #fff;
`;

const DateWrapper = styled.div`
  display: grid;
  padding: 8px;
  grid-template-rows: repeat(7, 35px);
  grid-template-columns: repeat(7, 35px);
`;

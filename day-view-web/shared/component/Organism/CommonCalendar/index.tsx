import { memo, useEffect, useState } from 'react';
import { getTodayYYMM } from '@/shared/util/calendar';
import Header from '@/shared/component/Organism/CommonCalendar/header';
import Labels from '@/shared/component/Organism/CommonCalendar/label';
import styled from 'styled-components';
import Dates from '@/shared/component/Organism/CommonCalendar/Dates';

type Props = {
  onSelectDay?: (sDate: string, endDate: string) => void;
};

const toNumber = (date: string) => +date.split('-').join('');
const Calendar = ({ onSelectDay }: Props) => {
  const [selectedYYMM, setSelectedYYMM] = useState(getTodayYYMM());
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

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

  useEffect(() => {
    onSelectDay && onSelectDay(startDate, endDate);
  }, [startDate, endDate, onSelectDay]);
  const isRangeDay = (date: string) => {
    if (startDate === '' || endDate === '') {
      return false;
    }

    const currDate = toNumber(date);
    const startDateNum = toNumber(startDate);
    const endDateNum = toNumber(endDate);
    return startDateNum <= currDate && currDate <= endDateNum;
  };

  return (
    <Wrapper>
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
  z-index: 1;
  position: absolute;
  top: 50%;
  left: 50%;
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

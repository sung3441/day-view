import { memo, useMemo } from 'react';
import { makeDays } from '@/shared/context/channel/util/date';
import Date from '@/shared/component/Organism/CommonCalendar/Date';

interface Props {
  year: number;
  month: number;
  startDate: string;
  endDate: string;
  handleSelectDay: (date: string) => void;
  isRangeDay: (date: string) => boolean;
}
const Dates = ({
  year,
  month,
  startDate,
  endDate,
  handleSelectDay,
  isRangeDay,
}: Props) => {
  const generatedDays = useMemo(() => {
    return makeDays(year, month);
  }, [year, month]);

  return (
    <>
      {generatedDays.map((info) => (
        <Date
          key={info.strDate}
          isSelectedStartDay={info.strDate === startDate}
          isSelectedEndDay={info.strDate === endDate}
          handleSelectDay={handleSelectDay}
          isRangeDay={isRangeDay}
          // isRangeDay={info.strDate === startDate || info.strDate === endDate}
          // isSelectedDay={info.strDate === selectedDay}
          // handleSelectDay={handleSelectDay}
          {...info}
        />
      ))}
    </>
  );
};

export default memo(Dates);

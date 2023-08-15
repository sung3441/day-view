import { memo } from 'react';
import Day from '@/component/date/Day';
import { useDate, useDateParam } from '@/shared/context/date/hooks/useDate';
import useGetDateRecord from '@/shared/context/date/hooks/useGetDateRecord';

const Dates = () => {
  const { generatedDays, handleSelectDay, selectedDay } = useDate();
  const { startDate, endDate } = useDateParam();
  const data = useGetDateRecord({ startDate, endDate });

  console.log(data);

  return (
    <>
      {generatedDays.map((info) => (
        <Day
          key={info.strDate}
          isSelectedDay={info.strDate === selectedDay}
          handleSelectDay={handleSelectDay}
          {...info}
        />
      ))}
    </>
  );
};

export default memo(Dates);

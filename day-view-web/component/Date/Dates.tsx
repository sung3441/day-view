import { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import Day from '@/component/Date/Day';
import { useDate, useDateParam } from '@/shared/context/date/hooks/useDate';
import useGetDateRecord from '@/shared/context/date/hooks/useGetDateRecord';

const Dates = () => {
  const { generatedDays, handleSelectDay, selectedDay } = useDate();
  const { startDate, endDate } = useDateParam();
  useGetDateRecord({ startDate, endDate });
  console.log(startDate, endDate);
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

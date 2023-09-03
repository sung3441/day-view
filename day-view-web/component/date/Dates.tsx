import { memo, useEffect } from 'react';
import Day from '@/component/date/Day';
import { useDate, useDateParam } from '@/shared/context/date/hooks/useDate';
import useGetDateRecord from '@/shared/context/date/hooks/useGetDateRecord';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { dayHeightAtom } from '@/shared/context/date/state';
import { selectedYYMMAtom } from '@/state/calendar';
import useGetRecordInSubscribe from '@/shared/context/date/hooks/useGetRecordInSubscribe';

const Dates = () => {
  const { year, month } = useRecoilValue(selectedYYMMAtom);
  const setInnerHeight = useSetRecoilState(dayHeightAtom);
  const { generatedDays, handleSelectDay, selectedDay } = useDate();
  const { startDate, endDate } = useDateParam();
  const { data } = useGetRecordInSubscribe({
    year,
    month,
    startDate,
    endDate,
  });
  const recode = useGetDateRecord({ data: data?.data ?? [] });

  useEffect(() => {
    const calcInnerHeight = () => {
      const vh = window.innerHeight;
      const innerH = (vh - 100 - 76 - 30) / (generatedDays.length / 7);
      setInnerHeight(innerH);
    };
    calcInnerHeight();
    window.addEventListener('resize', calcInnerHeight);
    return () => window.removeEventListener('resize', calcInnerHeight);
  });

  return (
    <>
      {generatedDays.map((info) => (
        <Day
          key={info.strDate}
          isSelectedDay={info.strDate === selectedDay}
          handleSelectDay={handleSelectDay}
          record={recode.get(info.strDate)}
          {...info}
        />
      ))}
    </>
  );
};

export default memo(Dates);

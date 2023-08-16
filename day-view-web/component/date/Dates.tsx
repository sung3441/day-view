import { memo, useEffect, useState } from 'react';
import Day from '@/component/date/Day';
import { useDate, useDateParam } from '@/shared/context/date/hooks/useDate';
import useGetDateRecord from '@/shared/context/date/hooks/useGetDateRecord';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { dayHeightAtom } from '@/shared/context/date/state';

const Dates = () => {
  const setInnerHeight = useSetRecoilState(dayHeightAtom);

  const { generatedDays, handleSelectDay, selectedDay } = useDate();
  const { startDate, endDate } = useDateParam();
  const data = useGetDateRecord({ startDate, endDate });

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
          record={data.get(info.strDate)}
          {...info}
        />
      ))}
    </>
  );
};

export default memo(Dates);

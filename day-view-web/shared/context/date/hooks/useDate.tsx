import { useRecoilState, useRecoilValue } from 'recoil';
import {
  cacheDaysAtom,
  selectedDayAtom,
  selectedYYMMAtom,
} from '@/state/calendar';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { makeDays } from '@/shared/context/channel/util/date';
import { covertDateParam } from '@/shared/context/date/util';

export const useDate = () => {
  const { year, month } = useRecoilValue(selectedYYMMAtom);
  const [selectedDay, setSelectedDay] = useRecoilState(selectedDayAtom);
  const [cacheDays, setCacheDays] = useRecoilState(cacheDaysAtom);
  const key = useRef<string>('');

  const generatedDays = useMemo(() => {
    key.current = `${year}-${month}`;
    if (cacheDays[key.current]) return cacheDays[key.current];
    return makeDays(year, month);
  }, [year, month]);

  const handleSelectDay = useCallback((day: string) => setSelectedDay(day), []);

  useEffect(() => {
    if (!cacheDays[key.current])
      setCacheDays((prev) => ({ ...prev, [key.current]: generatedDays }));
  }, [generatedDays]);

  return {
    generatedDays,
    handleSelectDay,
    selectedDay,
  };
};

export const useDateParam = () => {
  const { year, month } = useRecoilValue(selectedYYMMAtom);

  return useMemo(() => {
    const startDate = covertDateParam({ year, month, day: 1 });
    const endDate = covertDateParam({
      year,
      month,
      isLastDay: true,
    });
    return { startDate, endDate };
  }, [year, month]);
};

import { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import Day from '@/component/calendar/dateSection/Day';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  cacheDaysAtom,
  selectedDayAtom,
  selectedYYMMAtom,
} from '@/state/calendar';
import { makeDays } from '@/shared/context/channel/util/date';
import useGetMyChannelRecodes from '@/shared/context/channel/hooks/useGetMyChannelRecodes';

const Dates = () => {
  const { year, month } = useRecoilValue(selectedYYMMAtom);
  const [selectedDay, setSelectedDay] = useRecoilState(selectedDayAtom);
  const [cacheDays, setCacheDays] = useRecoilState(cacheDaysAtom);
  const key = useRef<string>('');

  // const { mySubscribeChannel } = useGetMyChannelRecodes();

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

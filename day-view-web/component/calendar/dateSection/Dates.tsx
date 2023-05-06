import { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import Day from '@/component/calendar/dateSection/Day';
import { DateFlag, DatType } from '@/shared/types/calendar';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  cacheDaysAtom,
  selectedDayAtom,
  selectedYYMMAtom,
} from '@/state/calendar';
import { getDateAndDay } from '@/shared/util/calendar';

type PushDataType = {
  list: DatType[];
  date: number;
  year: number;
  month: number;
  day: number;
  flag?: DateFlag;
};

function pushData({
  list,
  date,
  year,
  month,
  day,
  flag = 'this',
}: PushDataType) {
  const strDate = `${year.toString()}-${month.toString()}-${date.toString()}`;
  list.push({ date, strDate, day: day % 7, flag });
}

interface Props {
  year: number;
  month: number;
}

const Dates = () => {
  const { year, month } = useRecoilValue(selectedYYMMAtom);
  const [selectedDay, setSelectedDay] = useRecoilState(selectedDayAtom);
  const [cacheDays, setCacheDays] = useRecoilState(cacheDaysAtom);
  const key = useRef<string>('');

  // 캘린더 Ui 데이터는 서버데이터와 따로 관리한다.
  const generatedDays = useMemo(() => {
    key.current = `${year}-${month}`;
    if (cacheDays[key.current]) return cacheDays[key.current];

    const days: DatType[] = [];
    const { date: prevDate, day: prevDay } = getDateAndDay(year, month - 1);
    const { date: thisDate, day: thisDay } = getDateAndDay(year, month);

    const remainingDay = thisDay === 6 ? 0 : 6 - thisDay;
    let dayIdx = 0;

    // 이전달 데이터를 생성한다.
    for (let i = prevDate - prevDay; i <= prevDate && prevDay !== 6; i++)
      pushData({
        year,
        list: days,
        date: i,
        month: month - 1,
        flag: 'prev',
        day: dayIdx++,
      });
    for (let i = 1; i <= thisDate; i++)
      pushData({
        year,
        list: days,
        date: i,
        month: month,
        day: dayIdx++,
      });
    // // 다음달 데이터를 생성한다.
    for (let i = 1; i <= remainingDay; i++)
      pushData({
        year,
        list: days,
        date: i,
        month: month + 1,
        flag: 'next',
        day: dayIdx++,
      });

    return days;
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

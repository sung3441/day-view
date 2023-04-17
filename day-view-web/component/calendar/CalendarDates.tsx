import {
  ForwardedRef,
  forwardRef,
  memo,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import Day from '@/component/calendar/Day';
import { DateFlag, DatType } from '@/types/calendat';
import { number } from 'prop-types';
import day from '@/component/calendar/Day';
import { useRecoilState } from 'recoil';
import { selectedDayState, selectedYYMMState } from '@/state/calendar';

function getDateAndDay(year: number, month: number, date: number = 0) {
  const d = new Date(year, month, date);
  return { date: d.getDate(), day: d.getDay() };
}

function pushData(
  list: DatType[],
  date: number,
  year: number,
  month: number,
  flag: DateFlag = 'this',
  day: number
) {
  const strDate = `${year.toString()}-${month.toString()}-${date.toString()}`;
  list.push({ date, strDate, day: day % 7, flag });
}

interface Props {
  year: number;
  month: number;
}

const CalendarDates = ({ year, month }: Props) => {
  const [selectedDay, setSelectedDay] = useRecoilState(selectedDayState);

  // 캘린더 Ui 데이터는 서버데이터와 따로 관리한다.
  const generatedDays = useMemo(() => {
    const days: DatType[] = [];
    const { date: prevDate, day: prevDay } = getDateAndDay(year, month - 1);
    const { date: thisDate, day: thisDay } = getDateAndDay(year, month);
    const remainingDay = 7 - thisDay == 7 ? 0 : 7 - thisDay;
    let dayIdx = 1;

    // 이전달 데이터를 생성한다.
    for (let i = prevDate - prevDay + 1; i <= prevDate; i++)
      pushData(days, i, year, month - 1, 'prev', dayIdx++);
    for (let i = 1; i <= thisDate; i++)
      pushData(days, i, year, month, 'this', dayIdx++);
    // 다음달 데이터를 생성한다.
    for (let i = 1; i <= remainingDay; i++)
      pushData(days, i, year, month + 1, 'next', dayIdx++);

    return days;
  }, [year, month]);

  const handleSelectDay = useCallback((day: string) => {
    setSelectedDay(day);
  }, []);

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

export default memo(CalendarDates);

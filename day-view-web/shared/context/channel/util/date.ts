import { DateFlag, DatType } from '@/shared/types/calendar';
import { getDateAndDay } from '@/shared/util/calendar';
import { addZeroPad } from '@/shared/context/date/util';

type PushDataType = {
  list: DatType[];
  date: number;
  year: number;
  month: number;
  day: number;
  flag?: DateFlag;
};

const pushData = ({
  list,
  date,
  year,
  month,
  day,
  flag = 'this',
}: PushDataType) => {
  const strDate = `${year}-${addZeroPad(month)}-${addZeroPad(date)}`;
  list.push({ date, strDate, day: day % 7, flag });
};

export const makeDays = (year: number, month: number) => {
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
};

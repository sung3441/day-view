import { YYMMType } from '@/shared/types/calendar';

export const addZeroPad = (num: number | string) => {
  num = Number(num);
  return num < 10 ? `0${num}` : num;
};

const getLastDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 0).getDate();
};

type CovertDateParamProps = {
  year: number;
  month: number;
  day?: number;
  isLastDay?: boolean;
};

export const covertDateParam = ({
  year,
  month,
  day,
  isLastDay,
}: CovertDateParamProps) => {
  const setDay = () => {
    day = day || 1;
    if (isLastDay) day = getLastDayOfMonth(year, month);
    return day;
  };

  const strMonth = addZeroPad(month);
  const strDay = addZeroPad(setDay());

  return `${year}-${strMonth}-${strDay}T00:00:00`;
};

export function getTodayYYMM(): YYMMType {
  const today = new Date();
  return { year: today.getFullYear(), month: today.getMonth() + 1 };
}

export function getStrToday() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  return `${year.toString()}-${month.toString()}-${date.toString()}`;
}

export function getDateAndDay(year: number, month: number, date: number = 0) {
  const d = new Date(year, month, date);
  return { date: d.getDate(), day: d.getDay() };
}

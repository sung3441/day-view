import { YYMMType } from '@/shared/types/calendar';

export const addZeroPad = (
  num: number | string,
  cnt: number = 0,
  isReverse: boolean = false
): string => {
  num = Number(num);
  cnt = num < 10 ? cnt + 1 : cnt;
  const zeroPad = '0'.repeat(cnt);
  if (isReverse) return zeroPad ? `${num}${zeroPad}` : num.toString() + zeroPad;
  return zeroPad ? `${zeroPad}${num}` : zeroPad + num.toString();
};

const getLastDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 0).getDate();
};

type CovertDateParamProps = {
  year: number;
  month: number;
  date?: number;
  isLastDay?: boolean;
  isRequiredTime?: boolean;
};

export const covertDateParam = ({
  year,
  month,
  date,
  isLastDay,
  isRequiredTime = true,
}: CovertDateParamProps) => {
  const setDay = () => {
    date = date || 1;
    if (isLastDay) date = getLastDayOfMonth(year, month);
    return date;
  };

  const strMonth = addZeroPad(month);
  const strDay = addZeroPad(setDay());

  return `${year}-${strMonth}-${strDay}${isRequiredTime ? 'T00:00:00' : ''}`;
};

export const convertTimeParam = (time: string) => {
  return `T${addZeroPad(time.slice(0, 2))}:${addZeroPad(time.slice(2, 4))}:00`;
};

export function getTodayYYMM(d?: string): YYMMType {
  const today = d ? new Date(d) : new Date();
  return {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    date: today.getDate(),
  };
}

export function getStrToday() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  return `${year.toString()}-${addZeroPad(month)}-${addZeroPad(date)}`;
}

export function getDateAndDay(year: number, month: number, date: number = 0) {
  const d = new Date(year, month, date);
  return { date: d.getDate(), day: d.getDay() };
}

export const getTime = (date: Date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours}:${addZeroPad(minutes)}`;
};

const days = ['일', '월', '화', '수', '목', '금', '토'];

export const createDateInfo = (startDate: string, endDate?: string) => {
  const d = new Date(startDate);

  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const date = d.getDate();
  const dayOfWeek = d.getDay();
  const startTime = getTime(d);
  const endTime = endDate ? getTime(new Date(endDate)) : startTime;

  const key = `${year}-${addZeroPad(month)}-${addZeroPad(date)}`;
  return { key, month, date, startTime, endTime, strDay: days[dayOfWeek] };
};

export const currentTime = () => {
  const d = new Date();
  const hours = d.getHours();
  const minutes = d.getMinutes();
  return `${addZeroPad(hours)}${addZeroPad(minutes)}`;
};

export const getStrYYMM = (yymm: string) => {
  const yy = yymm.slice(0, 4);
  const mm = yymm.slice(5, 7);
  const dd = yymm.slice(8, 10);
  return `${yy}년 ${mm}월 ${dd}일`;
};

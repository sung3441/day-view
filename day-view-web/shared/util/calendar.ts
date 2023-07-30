import { YYMMType } from '@/shared/types/calendar';

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

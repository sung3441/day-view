import dayjs from 'dayjs';

export function dayjsToDate(dayjsObj: dayjs.Dayjs): Date {
  return dayjsObj.toDate();
}

export function dateToDayjs(dateObj: Date): dayjs.Dayjs {
  return dayjs(dateObj);
}

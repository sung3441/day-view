import { RecordRes } from '@/shared/types/api';

const getTargetYYMM = (year: number, month: number) => {
  const strMonth = month.toString();
  return `${year}-${strMonth.length === 1 ? `0${strMonth}` : strMonth}`;
};

const getTargetYYMMData = (targetYYMM: string, data: RecordRes[]) => {
  return data.filter(({ startDate }) => {
    const parts = startDate.split('-');
    return parts.slice(0, 2).join('-') === targetYYMM;
  });
};

export const selectedYYMMRecords = (data: any, year: number, month: number) => {
  const resData = data?.data?.data as RecordRes[];
  const targetYYMM = getTargetYYMM(year, month);
  return getTargetYYMMData(targetYYMM, resData);
};

// type
export type YYMMType = {
  year: number;
  month: number;
  date?: number;
};

export type DateType = {
  date: number;
  day: number;
};

export type SelectedYYMMDayInfoType = {
  startDayInfo: DateType;
  endDayInfo: DateType;
};

export type DateFlag = 'prev' | 'next' | 'this';

export type DatType = {
  date: number;
  strDate: string;
  day: number;
  flag: DateFlag;
};

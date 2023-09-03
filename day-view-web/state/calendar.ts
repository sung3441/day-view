import { atom } from 'recoil';
import { DatType, YYMMType } from '@/shared/types/calendar';
import { getStrDate, getTodayYYMM } from '@/shared/context/date/util';

// 캘린더 공용
export const selectedYYMMAtom = atom<YYMMType>({
  key: 'selectedYYMMAtom', // unique ID (with respect to other atoms/selectors)
  default: getTodayYYMM(), // default value (aka initial value)
});

export const selectedDayAtom = atom<string>({
  key: 'selectedDayAtom', // unique ID (with respect to other atoms/selectors)
  default: getStrDate(), // default value (aka initial value)
});

// @ts-ignore
export const cacheDaysAtom = atom<{ [key: string]: DatType[] }>({
  key: 'cacheDates',
  default: {},
});

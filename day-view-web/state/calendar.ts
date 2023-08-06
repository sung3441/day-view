import { atom } from 'recoil';
import { getStrToday, getTodayYYMM } from '@/shared/util/calendar';
import { DatType, YYMMType } from '@/shared/types/calendar';

export const selectedYYMMAtom = atom<YYMMType>({
  key: 'selectedYYMMAtom', // unique ID (with respect to other atoms/selectors)
  default: getTodayYYMM(), // default value (aka initial value)
});

export const selectedDayAtom = atom<string>({
  key: 'selectedDayAtom', // unique ID (with respect to other atoms/selectors)
  default: getStrToday(), // default value (aka initial value)
});

// @ts-ignore
export const cacheDaysAtom = atom<{ [key: string]: DatType[] }>({
  key: 'cacheDates',
  default: {},
});

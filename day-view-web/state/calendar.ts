import { atom } from 'recoil';
import { getStrToday, getTodayYYMM } from '@/util/calender';
import { YYMMType } from '@/types/calendat';

export const selectedYYMMState = atom<YYMMType>({
  key: 'selectedYYMMState', // unique ID (with respect to other atoms/selectors)
  default: getTodayYYMM(), // default value (aka initial value)
});

export const selectedDayState = atom<string>({
  key: 'selectedDayState', // unique ID (with respect to other atoms/selectors)
  default: getStrToday(), // default value (aka initial value)
});

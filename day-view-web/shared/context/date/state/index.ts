import { atom } from 'recoil';
import { getStrToday } from '@/shared/context/date/util';

export const dayHeightAtom = atom<number>({
  key: 'dayHeightAtom',
  default: 0,
});

export const scheduleYYMMAtom = atom<{
  startDate: string;
  endDate: string;
}>({
  key: 'selectedScheduleYYMMAtom',
  default: {
    startDate: getStrToday(),
    endDate: getStrToday(),
  },
});

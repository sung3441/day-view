import { atom } from 'recoil';
import { covertDateParam, getTodayYYMM } from '@/shared/context/date/util';

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
    startDate: covertDateParam({
      ...getTodayYYMM(),
      date: 1,
      isRequiredTime: false,
    }),
    endDate: covertDateParam({
      ...getTodayYYMM(),
      isLastDay: true,
      isRequiredTime: false,
    }),
  },
});

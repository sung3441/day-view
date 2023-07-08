import { atom } from 'recoil';

export const selectedChannelAtom = atom<string[]>({
  key: 'selectedChannelAtom',
  default: [],
});

export const channelColorIdAtom = atom<{
  id: number;
  x: number;
  y: number;
}>({
  key: 'selectedChannelAtom',
  default: {
    id: 0,
    x: 0,
    y: 0,
  },
});

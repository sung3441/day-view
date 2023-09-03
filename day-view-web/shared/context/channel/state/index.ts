import { atom } from 'recoil';

export const selectedChannelAtom = atom<string[]>({
  key: 'selectedChannelAtom',
  default: [],
});

export type ChannelColorInfoType = {
  id: number;
  x: number;
  y: number;
};

export const channelColorInfoAtom = atom<ChannelColorInfoType>({
  key: 'channelColorInfoAtom',
  default: {
    id: 0,
    x: 0,
    y: 0,
  },
});

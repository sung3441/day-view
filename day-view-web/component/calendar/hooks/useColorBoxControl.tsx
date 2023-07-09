import { useRecoilState, useRecoilValue } from 'recoil';
import { channelColorIdAtom } from '@/state/channel';
import { SyntheticEvent, useCallback } from 'react';

const useColorBoxControl = () => {
  const [channelColor, setChannelColor] = useRecoilState(channelColorIdAtom);

  const calcPosition = useCallback((e: SyntheticEvent) => {
    const BOTTOM_MARGIN = 10;
    const CLOSE_BOX_HEIGHT = 251;

    const target = e.target as HTMLElement;
    let { x, y, height } = target.getBoundingClientRect();
    const documentHeight = document.documentElement.offsetHeight;

    if (y + CLOSE_BOX_HEIGHT >= documentHeight)
      y = documentHeight - CLOSE_BOX_HEIGHT - BOTTOM_MARGIN;

    return { x, y };
  }, []);

  const closeColorBox = useCallback(() => {
    setChannelColor({
      id: 0,
      x: 0,
      y: 0,
    });
  }, []);

  const toggleChannelColor = useCallback(
    ({ id }: { id: number }, e?: SyntheticEvent) => {
      if (!e) {
        closeColorBox();
        return;
      }

      e.stopPropagation();
      const { x, y } = calcPosition(e);

      setChannelColor({
        id,
        x: x,
        y: y,
      });
    },
    []
  );

  return { channelColor, closeColorBox, toggleChannelColor };
};

export default useColorBoxControl;

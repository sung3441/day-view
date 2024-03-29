import { useRecoilState } from 'recoil';
import { channelColorInfoAtom } from '@/shared/context/channel/state';
import { SyntheticEvent, useCallback, useEffect } from 'react';
import { COLOR_BOX_HEIGHT } from '@/shared/constant/calendar';

interface Props {
  isRequiredEffect?: boolean;
}

const useColorBoxControl = ({ isRequiredEffect }: Props = {}) => {
  const [channelColor, setChannelColor] = useRecoilState(channelColorInfoAtom);

  const calcPosition = useCallback((e: SyntheticEvent) => {
    const BOTTOM_MARGIN = 10;

    const documentHeight = document.documentElement.offsetHeight;
    const target = e.target as HTMLElement;
    let { x, y } = target.getBoundingClientRect();

    if (y + COLOR_BOX_HEIGHT >= documentHeight)
      y = documentHeight - COLOR_BOX_HEIGHT - BOTTOM_MARGIN;

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

  useEffect(() => {
    if (!isRequiredEffect || channelColor.id === 0) return;

    if (channelColor.id) window.addEventListener('resize', closeColorBox);
    return () => window.removeEventListener('resize', closeColorBox);
  }, [isRequiredEffect, channelColor.id]);

  return { channelColor, closeColorBox, toggleChannelColor };
};

export default useColorBoxControl;

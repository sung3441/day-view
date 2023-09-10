import { useRecoilState, useSetRecoilState } from 'recoil';
import { isMobileViewAtom, viewWidthAtom } from '@/shared/atom/global';
import { useEffect } from 'react';

const useViewWidth = () => {
  const setWidth = useSetRecoilState(viewWidthAtom);
  const [isMobileView, setIsMobileView] = useRecoilState(isMobileViewAtom);

  useEffect(() => {
    const callbackResize = () => {
      const isUnder720 = window.innerWidth <= 720;
      setWidth(window.innerWidth);
      if (isUnder720 !== isMobileView) setIsMobileView(isUnder720);
    };

    callbackResize();
    window.addEventListener('resize', () => callbackResize());
    return () => window.removeEventListener('resize', () => callbackResize());
  }, [isMobileView]);
};

export default useViewWidth;

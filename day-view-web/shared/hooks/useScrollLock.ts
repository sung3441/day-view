import { useCallback, useEffect, useState } from 'react';

const useScrollLock = () => {
  const [isLocked, setIsLocked] = useState(false);
  const [scrollBarWidth, setScrollBarWidth] = useState(0);

  useEffect(() => {
    const documentWidth = document.documentElement.offsetWidth;
    const windowWidth = window.innerWidth;
    setScrollBarWidth(windowWidth - documentWidth);
  }, []);

  const lockScroll = useCallback(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollBarWidth}px`;
    console.log(scrollBarWidth);
  }, [scrollBarWidth]);

  const unLockScroll = useCallback(() => {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }, []);

  const toggleScrollLock = useCallback(() => {
    isLocked ? unLockScroll() : lockScroll();
    setIsLocked(!isLocked);
  }, [isLocked, lockScroll, unLockScroll]);

  return { lockScroll, unLockScroll, toggleScrollLock };
};

export default useScrollLock;

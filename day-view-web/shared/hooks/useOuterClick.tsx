// 보여지는 컴퍼넌트 밖에 요소를 클릭했을때 컴퍼넌트 close

import { useEffect, useRef } from 'react';

interface Props {
  callback: () => void;
  exceptionNodeId?: string;
}

const useOuterClick = <T extends HTMLElement>({
  callback,
  exceptionNodeId,
}: Props) => {
  const { current: stableCallback } = useRef(callback);
  const targetRef = useRef<T | null>(null); //

  function handleClick(e: MouseEvent) {
    if (!targetRef?.current) return;
    const el = e.target as T;

    if (
      !targetRef.current.contains(e.target as Node) ||
      el.id === exceptionNodeId
    ) {
      stableCallback();
    }
  }

  useEffect(() => {
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return targetRef;
};

export default useOuterClick;

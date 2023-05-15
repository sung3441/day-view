// 보여지는 컴퍼넌트 밖에 요소를 클릭했을때 컴퍼넌트 close

import { useEffect, useRef } from 'react';

interface Props {
  callback: () => void;
  exceptionNodeId?: string;
}

/**
 * 부착 컴포넌트를 show 하는 click 함수의 이벤트 버블링을 방지하여야함
 * @param callback: closeFunction
 * @param exceptionNodeId: 예외처리 Node
 */
const useOuterClick = <T extends HTMLElement>({
  callback,
  exceptionNodeId,
}: Props) => {
  const { current: stableCallback } = useRef(callback);
  const targetRef = useRef<T | null>(null); //

  useEffect(() => {
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

    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return targetRef;
};

export default useOuterClick;

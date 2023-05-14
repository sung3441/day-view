// 보여지는 컴퍼넌트 밖에 요소를 클릭했을때 컴퍼넌트 close

import { useEffect, useRef } from 'react';

interface Props {
  callback: () => void;
  isFlag?: boolean;
  exceptionNodeId?: string;
}

const useOuterClick = <T extends HTMLElement>({
  callback,
  exceptionNodeId,
  isFlag,
}: Props) => {
  const callbackRef = useRef(callback);
  const targetRef = useRef<T>(null); //

  function handleClick(e: MouseEvent) {
    const el = e.target as HTMLDivElement;
    if (!targetRef || !targetRef?.current || !el.className) return;

    if (!targetRef.current.contains(e.target as Node)) {
      callbackRef.current();
    } else if (exceptionNodeId && el.id === exceptionNodeId) {
      console.log('el', el);
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return targetRef;
};

export default useOuterClick;

import { useState } from 'react';

const useAnimationHandler = (closeFn: Function) => {
  const [isShow, setIsShow] = useState(true);

  const handleIsShow = () => setIsShow(false);
  const handleOnAnimationEnd = () => !isShow && closeFn();

  return { isShow, handleIsShow, handleOnAnimationEnd };
};

export default useAnimationHandler;

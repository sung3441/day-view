import { useState } from 'react';

const useAnimationHandler = (closeFn: () => void) => {
  const [isShow, setIsShow] = useState(true);

  const handleIsShow = () => setIsShow(false);
  const handelOnAnimationEnd = () => !isShow && closeFn();

  return { isShow, handleIsShow, handelOnAnimationEnd };
};

export default useAnimationHandler;

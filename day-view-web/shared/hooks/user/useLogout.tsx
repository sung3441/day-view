import { useSetRecoilState } from 'recoil';
import { isLoginAtom } from '@/shared/atom/global';
import { removeAccessToken } from '@/shared/util/auth';
import { useCallback } from 'react';

const useLogout = () => {
  const setIsLogin = useSetRecoilState(isLoginAtom);

  return useCallback(() => {
    // Todo logout api
    // 쿠키 삭제 안되면 로그인 갱신 됨
    removeAccessToken();
    setIsLogin(false);
    window.location.href = '/';
  }, []);
};

export default useLogout;

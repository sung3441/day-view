import { useSetRecoilState } from 'recoil';
import { isLoginAtom } from '@/shared/atom/global';
import getClient, { QueryKeys } from '@/shared/queryClient';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getAccessToken } from '@/shared/api';
import { setAccessToken } from '@/shared/util/auth';
import { UserRes } from '@/shared/types/api';

const usePageSetting = () => {
  const setIsLogin = useSetRecoilState(isLoginAtom);
  const queryClient = getClient();
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === '/auth') return;

    const setToken = async () => {
      const token = await getAccessToken();
      console.log('token', token);
      if (!token) throw new Error('token');
      setAccessToken(token!.data.token);
    };

    const setUser = async () => {
      const user = await queryClient.getQueryData<HttpResType<UserRes>>([
        QueryKeys.USER,
      ]);
      if (user?.status === 200) setIsLogin(true);
    };

    (async () => {
      try {
        await setToken();
        await setUser();
        queryClient.defaultQueryOptions().enabled = true;
      } catch (e) {
        await router.replace('/');
      }
    })();
  }, []);
};

export default usePageSetting;

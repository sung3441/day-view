import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Auth, { Client } from '@/shared/axios';
import { getUser } from '@/shared/api';
import axios from 'axios';

const Index = () => {
  const router = useRouter();
  const token = router.query.token as string;

  useEffect(() => {
    if (!token) return;
    Auth.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    (async () => {
      const res = await getUser();
      console.log(res);
    })();
    // router.replace('/calendar');
  }, [token]);

  return <div>카카오 로그인 처리중입니다.</div>;
};

export default Index;

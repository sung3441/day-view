import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Auth, { Client } from '@/shared/axios';

const Index = () => {
  const router = useRouter();
  const token = router.query.token as string;

  useEffect(() => {
    console.log('??????', token);
    if (!token) return;
    Auth.defaults.headers.common['authorization'] = `Bearer ${token}`;
    const client = new Client('/api/members/test');

    (async () => {
      const res = await client.get();
      console.log('res', res);
    })();

    router.replace('/calendar');
  }, [token]);

  return <div>카카오 로그인 처리중입니다.</div>;
};

export default Index;

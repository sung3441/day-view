import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Spinner from '@/shared/component/Atom/Spinner';
import styled from 'styled-components';
import Auth from '@/shared/axios';
import { getAccessToken, setCookieApi } from '@/shared/api';

const AuthPage = () => {
  const router = useRouter();
  const token = router.query.token as string;

  useEffect(() => {
    if (!token) return;
    (async () => {
      Auth.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      await setCookieApi();
      await getAccessToken();
      await window.location.replace('/calendar');
    })();
  }, [router, token]);

  return (
    <Wrapper>
      <Spinner />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
`;
export default AuthPage;

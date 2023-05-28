import button from '@/shared/component/Atom/Button';
import { memo } from 'react';

const KakaoLogin = () => {
  function kakaoLogin() {
    window.Kakao.Auth.authorize({
      redirectUri: 'http://localhost:3000/auth/kakaoLogin',
    });
  }

  return <button onClick={kakaoLogin}> 카카오 로그인 로직 테스트</button>;
};

export default memo(KakaoLogin);

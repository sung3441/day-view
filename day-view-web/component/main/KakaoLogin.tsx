import button from '@/shared/component/Atom/Button';
import { memo } from 'react';
import axios from "axios";

const KakaoLogin = () => {
  const url = "http://localhost:8080/oauth2/authorization/kakao?redirect_uri=http://localhost:3000/auth/kakaoLogin"



  return (
      <a href={url}>
        <button > 카카오 로그인 로직 테스트</button>
      </a>
  )
};

export default memo(KakaoLogin);

import button from '@/shared/component/Atom/Button';
import { memo } from 'react';
import axios from 'axios';
import { StyleLoginButton } from '@/component/auth/loginButton/styles';
import { Icon } from '@/shared/component/Atom';

const KakaoLoginButton = () => {
  const params = new URLSearchParams();
  params.append('redirect_uri', 'http://localhost:3000/auth');
  const url = `${process.env.NEXT_PUBLIC_KAKAO_URL}${params.toString()}`;

  return (
    <a href={url}>
      <StyleLoginButton name="kakao">
        <Icon type="kakao" />
        카카오로 로그인하기
      </StyleLoginButton>
    </a>
  );
};

export default memo(KakaoLoginButton);

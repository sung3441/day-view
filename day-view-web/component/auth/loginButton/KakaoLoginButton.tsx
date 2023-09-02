import { memo } from 'react';
import { StyleLoginButton } from '@/component/auth/loginButton/styles';
import { Icon } from '@/shared/component/Atom';

const KakaoLoginButton = () => {
  const params = new URLSearchParams();
  params.append('redirect_uri', `${process.env.NEXT_PUBLIC_WEB_URL}/auth`);

  const url = new URL(
    `${process.env.NEXT_PUBLIC_KAKAO_URL}?${params.toString()}`
  );

  return (
    <a href={url.toString()}>
      <StyleLoginButton name="kakao">
        <Icon type="kakao" />
        카카오로 로그인하기
      </StyleLoginButton>
    </a>
  );
};

export default memo(KakaoLoginButton);

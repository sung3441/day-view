import button from '@/shared/component/Atom/Button';
import { memo } from 'react';
import axios from 'axios';
import { StyleLoginButton } from '@/component/login/loginButton/styles';
import { Icon } from '@/shared/component/Atom';

const GoogleLoginButton = () => {
  const params = new URLSearchParams();
  params.append('redirect_uri', 'http://localhost:3000/auth');
  const url = `http://localhost:8080/oauth2/authorization/google?${params.toString()}`;

  return (
    <a href={url}>
      <StyleLoginButton name="google">
        <Icon type="google" />
        구글로 로그인하기
      </StyleLoginButton>
    </a>
  );
};

export default memo(GoogleLoginButton);

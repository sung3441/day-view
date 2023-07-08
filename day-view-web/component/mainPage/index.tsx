import { Icon } from '@/shared/component/Atom';
import { memo, useEffect } from 'react';
import styled from 'styled-components';
import { pixelToRemUnit } from '@/shared/styles/util';
import KakaoLoginButton from '@/component/auth/loginButton/KakaoLoginButton';
import GoogleLoginButton from '@/component/auth/loginButton/GoogleLoginButton';

const Main = () => {
  return (
    <>
      <IconWrap>
        <Icon type="mainLogo" width="100%" height="100%" />
      </IconWrap>
      <Buttons>
        <GoogleLoginButton />
        <KakaoLoginButton />
      </Buttons>
    </>
  );
};

export default memo(Main);

const IconWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;

  max-width: 589px;
  max-height: 367px;

  width: 95vw;
`;
const Buttons = styled.div`
  max-width: 520px;
  width: 95vw;
  margin-top: ${pixelToRemUnit(133)};
  padding-bottom: 1rem;
`;

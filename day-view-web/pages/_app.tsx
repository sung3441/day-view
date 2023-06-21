import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { Hydrate, QueryClientProvider } from 'react-query';
import { getClient } from '@/shared/queryClient';
import Layout from '@/shared/component/Layout';
import { RecoilRoot, RecoilEnv, useSetRecoilState } from 'recoil';
import { commonTheme } from '@/shared/styles/theme';
import GlobalStyle from '@/shared/styles/globalStyle';

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

import { isSetAccessToken, setAccessToken } from '@/shared/util/axios';
import { getAccessToken } from '@/shared/api';
import { useEffect } from 'react';
import { isLoginAtom } from '@/shared/atom/global';

// if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
//   import('../mocks');
// }

function App({ Component, pageProps }: AppProps) {
  const queryClient = getClient();

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Hydrate state={pageProps.dehydratedState}>
          <ThemeProvider theme={commonTheme}>
            <GlobalStyle />
            <APPWithConfig>
              <Component {...pageProps} />
            </APPWithConfig>
          </ThemeProvider>
        </Hydrate>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

const APPWithConfig = ({ children }: { children: any }) => {
  const setIsLogin = useSetRecoilState(isLoginAtom);
  useEffect(() => {
    (async () => {
      try {
        const token = await getAccessToken();
        setAccessToken(token!.data.token);
        setIsLogin(true);
      } catch (e) {
        console.log('e', e);
      }
    })();
  }, []);

  return <Layout>{children}</Layout>;
};

export default App;

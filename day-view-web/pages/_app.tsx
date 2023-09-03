import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { RecoilEnv, RecoilRoot, useSetRecoilState } from 'recoil';
import { Hydrate, QueryClientProvider } from 'react-query';
import { ThemeProvider } from 'styled-components';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StyledEngineProvider } from '@mui/styled-engine';

import Layout from '@/shared/component/Layout';
import GlobalStyle from '@/shared/styles/globalStyle';
import { commonTheme } from '@/shared/styles/theme';
import { setAccessToken } from '@/shared/util/auth';
import { getAccessToken } from '@/shared/api';
import { isLoginAtom } from '@/shared/atom/global';
import { ReactQueryDevtools } from 'react-query/devtools';
import getClient, { QueryKeys } from '@/shared/queryClient';
import { UserRes } from '@/shared/types/api';
import { useRouter } from 'next/router';

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

// if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
//   import('../mocks');
// }

function App({ Component, pageProps }: AppProps) {
  const queryClient = getClient();

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={commonTheme}>
              <GlobalStyle />
              <APPWithConfig>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Component {...pageProps} />
                </LocalizationProvider>
              </APPWithConfig>
              <ReactQueryDevtools
                initialIsOpen={typeof window !== 'undefined'}
              />
            </ThemeProvider>
          </StyledEngineProvider>
        </Hydrate>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

const APPWithConfig = ({ children }: { children: any }) => {
  const setIsLogin = useSetRecoilState(isLoginAtom);
  const queryClient = getClient();
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === '/auth') return;

    const setToken = async () => {
      const token = await getAccessToken();
      if (!token) throw new Error('token');
      setAccessToken(token!.data.token);
    };

    const setUser = async () => {
      const user = await queryClient.getQueryData<HttpResType<UserRes>>([
        QueryKeys.USER,
      ]);
      if (user?.status === 200) setIsLogin(true);
    };

    (async () => {
      try {
        await setToken();
        await setUser();
        queryClient.defaultQueryOptions().enabled = true;
      } catch (e) {
        await router.replace('/');
      }
    })();
  }, []);

  return <Layout>{children}</Layout>;
};

export default App;

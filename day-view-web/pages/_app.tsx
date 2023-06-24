import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { RecoilRoot, RecoilEnv, useSetRecoilState } from 'recoil';
import { QueryClientProvider, Hydrate } from 'react-query';
import { ThemeProvider } from 'styled-components';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StyledEngineProvider } from '@mui/styled-engine';

import Layout from '@/shared/component/Layout';
import GlobalStyle from '@/shared/styles/globalStyle';
import { commonTheme } from '@/shared/styles/theme';
import { getClient } from '@/shared/queryClient';
import { isSetAccessToken, setAccessToken } from '@/shared/util/axios';
import { getAccessToken } from '@/shared/api';
import { isLoginAtom } from '@/shared/atom/global';

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

// if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
//   import('../mocks');
// }

function App({ Component, pageProps }: AppProps) {
  const queryClient = getClient();

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Hydrate state={pageProps.dehydratedState}>
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={commonTheme}>
              <GlobalStyle />
              <APPWithConfig>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Component {...pageProps} />
                </LocalizationProvider>
              </APPWithConfig>
            </ThemeProvider>
          </StyledEngineProvider>
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
      } catch (e) {}
    })();
  }, []);

  return <Layout>{children}</Layout>;
};

export default App;

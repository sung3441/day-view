import type { AppProps } from 'next/app';
import { RecoilEnv, RecoilRoot } from 'recoil';
import { Hydrate, QueryClientProvider } from 'react-query';
import { ThemeProvider } from 'styled-components';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StyledEngineProvider } from '@mui/styled-engine';

import Layout from '@/shared/component/Layout';
import GlobalStyle from '@/shared/styles/globalStyle';
import { commonTheme } from '@/shared/styles/theme';
import { ReactQueryDevtools } from 'react-query/devtools';
import getClient from '@/shared/queryClient';
import usePageSetting from '@/shared/context/app/hooks/usePageSetting';
import useViewWidth from '@/shared/context/app/hooks/useViewWidth';

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
  usePageSetting();
  useViewWidth();
  return <Layout>{children}</Layout>;
};

export default App;

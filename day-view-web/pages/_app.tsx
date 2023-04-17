// import '@/styles/globals.css'
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import Gnb from '@/component/Gnb';
import GlobalStyle from '@/styles/globalStyle';
import { Hydrate, QueryClientProvider } from 'react-query';
import { getClient } from '@/queryClient';
import { useCallback, useState } from 'react';
import { darkTheme, lightTheme } from '@/styles/theme';
import Layout from '@/component/Layout';
import { RecoilRoot } from 'recoil';

function App({ Component, pageProps }: AppProps) {
  const queryClient = getClient();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const handleChangeTheme = useCallback(
    () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light')),
    []
  );

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Hydrate state={pageProps.dehydratedState}>
          <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
            <GlobalStyle />
            <Gnb handleChangeTheme={handleChangeTheme} />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </Hydrate>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default App;

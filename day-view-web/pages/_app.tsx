import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { Hydrate, QueryClientProvider } from 'react-query';
import { getClient } from '@/shared/queryClient';
import { useCallback, useState } from 'react';
import Layout from '@/shared/component/Layout';
import { RecoilRoot } from 'recoil';
import { darkTheme, lightTheme } from '@/shared/styles/theme';
import GlobalStyle from '@/shared/styles/globalStyle';

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

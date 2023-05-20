import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { Hydrate, QueryClientProvider } from 'react-query';
import { getClient } from '@/shared/queryClient';
import Layout from '@/shared/component/Layout';
import { RecoilRoot } from 'recoil';
import { commonTheme } from '@/shared/styles/theme';
import GlobalStyle from '@/shared/styles/globalStyle';

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  import('../mocks');
}

function App({ Component, pageProps }: AppProps) {
  const queryClient = getClient();

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Hydrate state={pageProps.dehydratedState}>
          <ThemeProvider theme={commonTheme}>
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

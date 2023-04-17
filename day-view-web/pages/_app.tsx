// import '@/styles/globals.css'
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import Gnb from "@/component/Gnb";
import GlobalStyle from "@/styles/globalStyle";
import { Hydrate, QueryClientProvider } from "react-query";
import { getClient } from "@/queryClient";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store, wrapper } from "@/redux";
import { useCallback, useState } from "react";
import { darkTheme, lightTheme } from "@/styles/theme";
import Layout from "@/component/Layout";

function App({ Component, pageProps }: AppProps) {
  const queryClient = getClient();
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const handleChangeTheme = useCallback(
    () => setTheme((prev) => (prev === "light" ? "dark" : "light")),
    []
  );

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
              <GlobalStyle />
              <Gnb handleChangeTheme={handleChangeTheme} />
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ThemeProvider>
          </Hydrate>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}

export default wrapper.withRedux(App);

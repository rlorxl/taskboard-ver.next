import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import Header from '../component/layout/header';
import { Provider } from 'react-redux';
import { store } from '../store/configStore';

import GlobalStyle from '../styles/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Provider store={store}>
            <Header />
            <Component {...pageProps} />
          </Provider>
        </ThemeProvider>
      </SessionProvider>
    </>
  );
}

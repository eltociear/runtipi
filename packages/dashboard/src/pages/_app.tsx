import type { AppProps } from 'next/app';
import AuthWrapper from '../modules/Auth/containers/AuthWrapper';
import { ApolloProvider } from '@apollo/client';
import useCachedResources from '../hooks/useCachedRessources';
import Head from 'next/head';
import StatusWrapper from '../components/StatusScreens/StatusWrapper';
import LoadingScreen from '../components/LoadingScreen';
import ToastProvider from '../components/Providers/ToastProvider';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const themeCheck = () => {
    if (localStorage.darkMode === 'true' || (!('darkMode' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.body.classList.add('theme-dark');
    } else {
      document.body.classList.remove('theme-light');
    }
  };

  // check theme on component mount
  useEffect(() => {
    themeCheck();
  }, []);

  const { client } = useCachedResources();

  if (!client) {
    return <LoadingScreen />;
  }

  return (
    <ApolloProvider client={client}>
      <Head>
        <title>Tipi</title>
      </Head>
      <ToastProvider>
        <StatusWrapper>
          <AuthWrapper>
            <Component {...pageProps} />
          </AuthWrapper>
        </StatusWrapper>
      </ToastProvider>
    </ApolloProvider>
  );
}

export default MyApp;

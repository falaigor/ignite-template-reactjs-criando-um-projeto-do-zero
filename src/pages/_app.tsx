import { AppProps } from 'next/app';
import { Header } from '../components/Header/index';
// import { Provider as NextAuthProvider } from 'next-auth/client'

import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

import { AppProps } from 'next/app';
import React from 'react';

import { Header } from '../components/Header';
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

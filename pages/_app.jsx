'use client';
import React, { useState } from 'react';
import Layout from '../components/layout/layout';
import '../styles/globals.css';
import 'react-datepicker/dist/react-datepicker.css';
import Router from 'next/router';
import Loading from '../components/layout/loading';
import AuthContext from '../context/auth-context';

export default function App({
  Component,
  pageProps,
}) {
  const [loading, setLoading] =
    React.useState(false);
  React.useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);
    return () => {
      Router.events.off(
        'routeChangeStart',
        start
      );
      Router.events.off(
        'routeChangeComplete',
        end
      );
      Router.events.off('routeChangeError', end);
    };
  }, []);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <AuthContext>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthContext>
      )}
    </>
  );
}

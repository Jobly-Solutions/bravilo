import '@chaindesk/lib/env';
import '@chaindesk/ui/styles/globals.css';
import '@chaindesk/ui/styles/preflight.css';
import '@app/styles/nprogress.css';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '@react-pdf-viewer/search/lib/styles/index.css';
import '@react-pdf-viewer/highlight/lib/styles/index.css';

import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { SessionProvider } from 'next-auth/react';
import React, { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

import Analytics from '@app/components/Analytics';
import DefaultSEOTags from '@app/components/DefaultSEOTags';
import SynchTailwindColorMode from '@app/components/SynchTailwindColorMode';
import { NavbarProvider } from '@app/hooks/useNavbar';
import {
  getProductFromHostname,
  ProductContext,
  ProductType,
} from '@app/hooks/useProduct';
import useUTMTracking from '@app/hooks/useUTMTracking';

import { NextPageWithLayout, RouteNames } from '@chaindesk/lib/types';
import theme from '@chaindesk/ui/themes/dashboard';
import ThemeProvider from '@chaindesk/ui/themes/provider';

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const TopProgressBar = dynamic(
  () => import('@app/components/TopProgressBar'),
  { ssr: false }
);

export default function App({
  Component,
  pageProps,
  ...otherProps
}: AppPropsWithLayout) {
  const router = useRouter();
  const getLayout = Component.getLayout ?? ((page) => page);
  const [product, setProduct] = React.useState<ProductType>(pageProps.product);

  useUTMTracking();

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setProduct(getProductFromHostname(window.location.hostname));
    }
  }, [setProduct]); // Añadida dependencia setProduct

  const commonProviders = (
    <ProductContext.Provider value={product}>
      <SessionProvider> {/* SessionProvider unificado */}
        <Analytics>
          <Toaster />
          <DefaultSEOTags />
          <SynchTailwindColorMode />
          <Head>
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
              key="viewport"
            />
          </Head>
          {router.pathname === '/agents/[agentId]/iframe' ||
          router.pathname === '/agents/[agentId]/standalone' ? (
            <Component {...pageProps} />
          ) : (
            <NavbarProvider>
              {getLayout(<Component {...pageProps} />)}
            </NavbarProvider>
          )}
        </Analytics>
      </SessionProvider>
    </ProductContext.Provider>
  );

  return (
    <ThemeProvider {...otherProps} theme={theme}>
      <TopProgressBar />
      {commonProviders}
    </ThemeProvider>
  );
} 
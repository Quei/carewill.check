import '@assets/main.css';
import '@assets/chrome-bug.css';
import 'keen-slider/keen-slider.min.css';

import { useEffect } from 'react';
import { Head } from '@components/common';
import { ManagedUIContext } from '@components/ui/context';
import type { FC } from 'react';
import type { AppProps } from 'next/app';

const Noop: FC = ({ children }) => <>{children}</>;

export default function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop;

  useEffect(() => {
    document.body.classList?.remove('loading');
  }, []);

  return (
    <>
      <Head />
      <ManagedUIContext>
        <Layout pageProps={pageProps}>
          <Component {...pageProps} />
        </Layout>
      </ManagedUIContext>
    </>
  );
}

import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';

interface PageProps {
  session: any;
}

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

import { AppProps } from "next/app";
import { SessionProvider } from 'next-auth/react';
import '../styles/globals.css';

// interface PageProps {
//   session: any;
// }

// interface SessionProviderProps {
//   session: any;
// }

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider
    // @ts-ignore
      session={pageProps.session}
    >
      <Component {...pageProps} />
    </SessionProvider>
  )
}

import { AppProps } from "next/app";
import { SessionProvider } from 'next-auth/react';
import { RecoilRoot } from "recoil";
import '../styles/globals.css';

// interface PageProps {
//   session: any;
// }

// interface SessionProviderProps {
//   session: any;
// }

export default function App({ Component, pageProps }: AppProps) {
  return (
    // @ts-ignore
    <SessionProvider session={pageProps.session}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </SessionProvider>
  )
}

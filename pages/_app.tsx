import { AppProps } from "next/app";
import { SessionProvider } from 'next-auth/react';
import { RecoilRoot } from "recoil";
import '../styles/globals.css';
import { ChakraProvider } from "@chakra-ui/react";

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
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </RecoilRoot>
    </SessionProvider>

  )
}

import type { NextPage } from 'next'
import { unstable_getServerSession } from 'next-auth'
import Head from 'next/head'
import { Feed } from '../components/Feed'
import { Sidebar } from '../components/Sidebar'
import { getProviders, getSession, useSession } from "next-auth/react";

export const Home: NextPage = () => {
  return (
    <>
      <div>
        <Head>
          <title>Twitter</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
      </div>
      <main className='bg-black min-h-screen flex max-w-[1500px] mx-auto'>
        <Sidebar />
        <Feed />
        {/* Widgets */}
        {/* Modal */}
      </main>
    </>
  )
}

export async function getServerSideProps(context: any) {
  const trendingResults = await fetch("https://jsonkeeper.com/b/NKEV").then(
    (res) => res.json(),
  );
  const followResults = await fetch("https://jsonkeeper.com/b/WWMJ").then(
    (res) => res.json(),
  );
  const providers = await getProviders();
  const session = await getSession(context);

  return {
    props: {
      trendingResults,
      followResults,
      providers,
      session,
    },
  };
}

import type { NextPage } from 'next'
import Head from 'next/head'
import { Feed } from '../components/Feed'
import { Sidebar } from '../components/Sidebar'
import { getProviders, getSession, useSession } from "next-auth/react";
import { Login } from '../components/Login';
import { Provider } from 'next-auth/providers';
import { Modal } from '../components/Modal';
import { useRecoilState } from 'recoil';
import { modalState } from '../atoms/modelAtom';

/*
In next.js all pages has to be exported default. 
Otherwise you get the error message "The default export is not a React Component in page: "/" "
*/
interface Props {
  trendingResults: any,
  followResults: any,
  providers: Provider[],
}

const Home = ({ trendingResults, followResults, providers }: Props) => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useRecoilState(modalState);

  if (!session) return <Login providers={providers} />

  return (
    <div className="">
      <Head>
        <title>Twitter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='bg-black min-h-screen flex max-w-[1500px] mx-auto'>
        <Sidebar />
        <Feed />
        {/* Widgets */}
        {isOpen && <Modal/>}
      </main>
    </div>
  )
}

export default Home;

// Server side = static content
export async function getServerSideProps(context: any) {
  // const trendingResults = { name: "dkfj", tag: "fashion" }; //= await fetch("https://jsonkeeper.com/b/NKEV").then(
  //   (res) => res.json(),
  // );
  // const followResults = { influencer: "Kally Mani", country: "India" }; //= await fetch("https://jsonkeeper.com/b/WWMJ").then(
  //   (res) => res.json(),
  // );
  const providers = await getProviders();
  const session = await getSession(context);

  // return providers?.google;
  // {
  //   trends: trendingResults,
  //   follow: followResults,
  // }
  return {
    props: {
      // trendingResults,
      // followResults,
      providers,
      session,
    },
  };
}

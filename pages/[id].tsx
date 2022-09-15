import { getProviders, getSession, useSession } from "next-auth/react";
import Head from 'next/head'
import { useRecoilState } from 'recoil';
import { modalState } from '../atoms/modelAtom';
import { Sidebar } from '../components/Sidebar'
import { Modal } from '../components/Modal';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "../configs/firebase";
import { doc, DocumentData, onSnapshot } from "firebase/firestore";
import { Login } from "../components/Login";
import { Provider } from "next-auth/providers";

export async function getServerSideProps(context: any) {
    const trendingResults = {};
    const followResults = {};
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
            trendingResults,
            followResults,
            providers,
            session,
        },
    };
}

interface PostPageProps {
    trendingResults: any,
    followResults: any,
    providers: Provider[],
}

export default function PostPage({ trendingResults, followResults, providers }: PostPageProps) {
    /*
    In next.js all pages has to be exported default. 
    Otherwise you get the error message "The default export is not a React Component in page: "/" "
    */
    const { data: session } = useSession();
    const [isOpen, setIsOpen] = useRecoilState(modalState);
    const router = useRouter();
    const { id } = router.query;
    const [post, setPost] = useState<DocumentData>();

    useEffect(
        () =>
            onSnapshot(doc(db, "posts", id), (snapshot) => {
                setPost(snapshot.data());
            }),
        [db]
    );

    if (!session) return <Login providers={providers} />

    return (
        <div className="">
            <Head>
                <title>
                    {post?.username} on Twitter: "{post?.text}"
                </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className='bg-black min-h-screen flex max-w-[1500px] mx-auto'>
                <Sidebar />
                {/* Widgets */}
                {isOpen && <Modal />}
            </main>
        </div>
    )
};

// I get this message if I don't use "default" --->
// Error: The default export is not a React Component in page "/[id]"


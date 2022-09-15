import { getProviders, getSession, useSession } from "next-auth/react";
import Head from 'next/head'
import { useRecoilState } from 'recoil';
import { modalState } from '../atoms/modelAtom';
import { Sidebar } from '../components/Sidebar'
import { Modal } from '../components/Modal';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "../configs/firebase";
import { collection, doc, DocumentData, onSnapshot, orderBy, query } from "firebase/firestore";
import { Login } from "../components/Login";
import { Provider } from "next-auth/providers";
import { FaArrowLeft } from "react-icons/fa";
import { Post } from "../components/Post";
import { Comment } from "../components/Comment";

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
    const [comments, setComments] = useState<DocumentData[]>();

    useEffect(
        () =>
            onSnapshot(doc(db, "posts", id), (snapshot) => {
                setPost(snapshot.data());
            }),
        [db]
    );

    useEffect(
        () =>
            onSnapshot(
                query(
                    collection(db, "posts", id, "comments"),
                    orderBy("timestamp", "desc")
                ),
                (snapshot) => setComments(snapshot.docs)
            ),
        [db, id]
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
                <div className="flex-grow border-l border-r border-gray-700
                 max-w-2xl sm:ml-[73px] xl:ml-[370px]">
                    <div className="flex items-center px-1.5 py-2 border-b
                    border-gray-700 text-[#d9d9d9] font-semibold text-xl
                    gap-x-4 sticky top-0 z-50 bg-black">
                        <div className="hoverAnimation w-9 x-9 flex items-center
                        justify-center xl:px-0"
                            onClick={() => router.push("/")}
                        >
                            <FaArrowLeft className="h-5 text-white" />
                        </div>
                        Tweet
                    </div>
                    <Post id={id} post={post} postPage />
                    {comments?.length > 0 && (
                        <div className="pb-72">
                            {comments?.map(comment => {
                                <Comment key={comment.id} id={comment.id}
                                    comment={comment.data()} />
                            })}

                        </div>
                    )}
                </div>

                {/* Widgets */}
                {isOpen && <Modal />}
            </main>
        </div>
    )
};

// I get this message if I don't use "default" --->
// Error: The default export is not a React Component in page "/[id]"


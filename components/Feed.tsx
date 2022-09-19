import { collection, DocumentData, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { HiOutlineSparkles as SparklesIcon } from "react-icons/hi";
import { db } from "../configs/firebase";
import { Input } from "./Input";
import { MyPost, Post } from "./Post";

export const Feed = () => {
    const [posts, setPosts] = useState([]);

    useEffect(
        () =>
            onSnapshot(
                query(collection(db, "posts"), orderBy("timestamp", "desc")),
                (snapshot) => {
                    setPosts(snapshot.docs);
                }
            ),
        [db]
    );

    return (
        <div className="tw-text-white tw-flex-grow tw-border-l tw-border-r 
        tw-border-gray-700 tw-max-w-2xl sm:tw-ml-[73px] xl:tw-ml-[370px]">
            <div className="tw-text-[#d9d9d9] tw-flex tw-items-center
            sm:tw-justify-between tw-py-2 tw-px-3 tw-sticky tw-top-0 tw-z-50 tw-bg-black 
            tw-border-b tw-border-gray-700">
                <h2 className="tw-text-lg sm:tw-text-xl tw-font-bold">Home</h2>
                <div className="hoverAnimation tw-w-9 tw-h-9 tw-flex tw-items-center
                tw-justify-center xl:tw-px-0 tw-ml-auto">
                    <SparklesIcon className="tw-h-5 tw-text-white" />
                </div>
            </div>
            <Input />
            <div className="tw-pb-72">
                {posts.map((post: MyPost) => (
                    <Post key={post.id} id={post.id} post={post.data()} />
                ))}
            </div>
        </div>
    )
}

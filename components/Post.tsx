import { collection, deleteDoc, doc, DocumentData, onSnapshot, orderBy, query, setDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
    BsChatRightText as ChatIcon,
    BsSuitHeart as HeartIcon, BsSuitHeartFill as HeartIconFilled
} from "react-icons/bs";
import { FaTrash as TrashIcon } from "react-icons/fa";
import { HiDotsHorizontal, HiSwitchHorizontal } from "react-icons/hi";
import Moment from "react-moment";
import { useRecoilState } from "recoil";
import { modalState, postIdState } from "../atoms/modelAtom";
import { db } from "../configs/firebase";
import { CommentIcon } from "./CommentIcon";
import { TrashIconComponent } from "./TrashIconComponent";
import { LikesComponent } from "./LikesComponent";

export type MyPost = PostProps;

interface PostProps {
    // key: number
    id: number | undefined
    post: DocumentData | undefined
    postPage?: MyPost
}

export const Post = (props: PostProps) => {
    const { id, post, postPage } = props;
    const { data: session } = useSession();
    const [isOpen, setIsOpen] = useRecoilState(modalState);
    const [postId, setPostId] = useRecoilState(postIdState);
    const [comments, setComments] = useState([]);
    // const [likes, setLikes] = useState([]);
    // const [liked, setLiked] = useState(false);
    const router = useRouter();

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

    return (
        <div className="p-3 flex cursor-pointer border-b border-gray-700"
            onClick={() => router.push(`/${id}`)}
        >
            {!postPage && (
                <img
                    src={post?.userImg}
                    alt="Profile Pic"
                    className="h-11 w-11 rounded-full mr-4"
                />
            )}
            <div className="flex flex-col space-y-2 w-full">
                <div className={`flex ${!postPage && "justify-between"}`}>
                    {postPage && (
                        <img
                            src={post?.userImg}
                            alt="Profile Pic"
                            className="h-11 w-11 rounded-full mr-4"
                        />
                    )}
                    <div className="text-[#6e767d]">
                        <div className="inline-block group">
                            <h4
                                className={`font-bold text-[15px] sm:text-base
                               text-[#d9d9d9] hover:underline ${!postPage && "inline-block"
                                    }`}
                            >
                                {post?.username}
                            </h4>
                            <span className={`text-sm sm:text-[15px] ${!postPage && "ml-1.5"}`}
                            >
                                @{post?.tag}
                            </span>
                        </div>{" "}.{" "}
                        <span className="hover:underline text-sm sm:text-[15px]">
                            <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
                        </span>
                        {!postPage && (
                            <p className="text-[#d9d9d9] text-[15px] sm:text-base mt-0.5">
                                {post?.text}
                            </p>
                        )}
                    </div>
                    <div className="icon group flex-shrink-0 ml-auto">
                        <HiDotsHorizontal className="h-5 text-[#6e767d]
                        group-hover:text-[#1d9bf0]" />
                    </div>
                </div>
                {postPage && (
                    <p className="text-[#d9d9d9] text-[15px] sm:text-base mt-0.5">
                        {post?.text}
                    </p>
                )}

                {/* Image at the bottom of the posts */}
                <img
                    src={post?.image}
                    alt=""
                    className="rounded-2xl max-h-[700px] object-cover mr-2"
                />
                <div
                    className={`text-[#6e767d] flex justify-between w-10/12 ${postPage && "mx-auto"
                        }`}
                >

                    {/* All the icons for each post: comment, delete, favorite, share and  */}
                    {/* Comment Icon */}
                    <div
                        className="flex items-center space-x-1 group"
                        onClick={(e) => {
                            e.stopPropagation();
                            setPostId(id?.toString());
                            setIsOpen(true);
                            console.log("You just clicked the Comment icon !!");
                        }}
                    >

                        <CommentIcon comments={comments} />

                        <TrashIconComponent idUser={session?.user?.id} idPost={post?.id} />

                        <LikesComponent session={session} id={id} />

                    </div>
                </div>
            </div >
        </div>
    );
}


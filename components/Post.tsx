import { collection, DocumentData, onSnapshot, orderBy, query, QueryDocumentSnapshot, setDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import Moment from "react-moment";
import { useRecoilState } from "recoil";
import { modalState, postIdState } from "../atoms/modelAtom";
import { db } from "../configs/firebase";
import { Comment } from "./Comment";
import { CommentIcon } from "./CommentIcon";
import { TrashIconComponent } from "./TrashIconComponent";
import { LikesComponent } from "./LikesComponent";

export type MyPost = PostProps;

interface PostProps {
    // key: number
    id: any
    post: any     // DocumentData
    postPage?: MyPost
}

export const Post = (props: PostProps) => {
    const { id, post, postPage } = props;
    const { data: session } = useSession();
    const [isOpen, setIsOpen] = useRecoilState(modalState);  // Recoil is a state management tool
    const [postId, setPostId] = useRecoilState(postIdState); // Recoil is a state management tool
    const [comments, setComments] = useState<QueryDocumentSnapshot<DocumentData>[]>();
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
        <div className="tw-p-3 tw-flex tw-cursor-pointer tw-border-b tw-border-gray-700"
            onClick={() => router.push(`/${id}`)}
        >
            {!postPage && (
                <img
                    src={post?.userImg}
                    alt="Profile Pic"
                    className="tw-h-11 tw-w-11 tw-rounded-full tw-mr-4"
                />
            )}
            <div className="tw-flex tw-flex-col tw-space-y-2 tw-w-full">
                <div className={`tw-flex ${!postPage && "tw-justify-between"}`}>
                    {postPage && (
                        <img
                            src={post?.userImg}
                            alt="Profile Pic"
                            className="tw-h-11 tw-w-11 tw-rounded-full tw-mr-4"
                        />
                    )}
                    <div className="tw-text-[#6e767d]">
                        <div className="tw-inline-block group">
                            <h4
                                className={`tw-font-bold tw-text-[15px] sm:tw-text-base
                               tw-text-[#d9d9d9] hover:tw-underline ${!postPage && "tw-inline-block"
                                    }`}
                            >
                                {post?.username}
                            </h4>
                            <span className={`text-sm sm:text-[15px] ${!postPage && "ml-1.5"}`}
                            >
                                {" "}@{post?.tag}
                            </span>
                        </div>{" "}.{" "}
                        <span className="hover:tw-underline tw-text-sm sm:tw-text-[15px]">
                            <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
                        </span>
                        {!postPage && (
                            <p className="tw-text-[#d9d9d9] tw-text-[15px] sm:tw-text-base mt-0.5">
                                {post?.text}
                            </p>
                        )}
                    </div>
                    <div className="tw-icon tw-group tw-flex-shrink-0 tw-ml-auto">
                        <HiDotsHorizontal className="tw-h-5 tw-text-[#6e767d]
                        group-hover:tw-text-[#1d9bf0]" />
                    </div>
                </div>
                {postPage && (
                    <p className="tw-text-[#d9d9d9] tw-text-[15px] sm:tw-text-base tw-mt-0.5">
                        {post?.text}
                    </p>
                )}

                {/* Image at the bottom of the posts */}
                <img
                    src={post?.image}
                    alt=""
                    className="tw-rounded-2xl tw-max-h-[700px] tw-object-cover tw-mr-2"
                />
                <div
                    className={`tw-text-[#6e767d] tw-flex tw-justify-between tw-w-10/12 ${postPage && "tw-mx-auto"
                        }`}
                >

                    {/* All the icons for each post: comment, delete, favorite, share and  */}
                    {/* Comment Icon */}
                    <div
                        className="tw-flex tw-items-center tw-space-x-7 tw-ml-20 tw-group"
                        onClick={(e) => {
                            e.stopPropagation();
                            setPostId(id?.toString());
                            setIsOpen(true);
                            console.log("You just clicked the Comment icon !!");
                        }}
                    >


                        {!postPage && (
                            <>  {/* @ts-ignore */}
                                <CommentIcon comments={comments} />

                                <TrashIconComponent session={session} id={id} post={post} />

                                <LikesComponent session={session} id={id} />
                            </>
                        )}

                    </div>
                </div>
            </div >
        </div>
    );
}


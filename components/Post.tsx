import { DocumentData } from "firebase/firestore";
import { HiDotsHorizontal } from "react-icons/hi";

export type MyPost = Props;

interface Props {
    // key: number
    id: number
    post: DocumentData
    postPage?: MyPost
}

export const Post = (props: Props) => {
    const { id, post, postPage } = props;

    return (
        <div className="p-3 flex cursor-pointer border-b border-gray-700">
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
                            {/* timestamp */}
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

                    {/* All the icons for each post */}

                </div>
            </div>
        </div>
    );
}

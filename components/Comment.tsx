import { DocumentData } from "firebase/firestore"
import { HiDotsHorizontal } from "react-icons/hi";
import Moment from "react-moment";
import { MyPost } from "./Post"

interface CommentProps {
    comment;
}

export const Comment = ({ comment }: CommentProps) => {
    // const { id, post, postPage } = props;

    return (
        <div className="tw-p-3 tw-flex tw-cursor-pointer tw-border-b
        tw-border-gray-700">
            <img
                src={comment?.userImg}
                alt=""
                className="tw-h-11 tw-w-11 tw-rounded-full tw-mr-4"
            />
            <div className="tw-flex tw-flex-col tw-space-y-2 tw-w-full">
                <div className="tw-flex tw-justify-between">
                    <div className="tw-text-[#6e767d12]">
                        <div className="tw-inline-block tw-group">
                            <h4 className="tw-font-bold tw-text-[#d9d9d9] tw-text-[15px] sm:tw-text-base tw-inline-block group-hover:tw-underline">
                                {comment?.username}
                            </h4>
                            <span className="tw-ml-1.5 tw-text-sm sm:tw-text-[15px]">
                                @{comment?.tag}{" "}
                            </span>
                        </div>{" "}
                        .{" "}
                        <span className="hover:tw-underline tw-text-sm sm:tw-text-[15px]">
                            <Moment fromNow>{comment?.timestamp?.toDate()}</Moment>
                        </span>
                        <p className="tw-text-[#d9d9d9] tw-mt-0.5 tw-max-w-lg tw-overflow-scroll tw-text-[15px] sm:tw-text-base">
                            {comment?.comment}
                        </p>
                    </div>
                    <div className="icon group flex-shrink-0">
                        <HiDotsHorizontal className="h-5 text-[#6e767d] group-hover:text-[#1d9bf0]" />
                    </div>
                </div>

            </div>
        </div>
    )
}

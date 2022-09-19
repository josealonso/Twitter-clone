import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import {
    BsChatRightText as ChatIcon,
} from "react-icons/bs";

export const CommentIcon = (comments: QueryDocumentSnapshot<DocumentData>[]) => {

    return (
        <div
            className="tw-flex tw-items-center tw-space-x-1 tw-group"
            onClick={(e) => {
                e.stopPropagation();
                // setPostId(id);
                // setIsOpen(true);
            }}
        >

            <div className="tw-icon group-hover:tw-bg-[#1d9bf0] group-hover:tw-bg-opacity-10">
                <ChatIcon className="tw-h-5 group-hover:tw-text-[#1d9bf0]" />
            </div>
            {comments.length > 0 && (
                <span className="group-hover:tw-text-[#1d9bf0] tw-text-sm">
                    {comments.length}
                </span>
            )}
        </div>
    )
}

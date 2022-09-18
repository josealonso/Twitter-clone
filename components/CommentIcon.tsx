import {
    BsChatRightText as ChatIcon,
} from "react-icons/bs";

export const CommentIcon = (comments: string[]) => {

    return (
        <div className="tw-icon group-hover:tw-bg-[#1d9bf0] group-hover:tw-bg-opacity-10">
            <div>
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

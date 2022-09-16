import {
    BsChatRightText as ChatIcon,
} from "react-icons/bs";

export const CommentIcon = (comments: string[]) => {

    return (
        <div className="icon group-hover:bg-[#1d9bf0] group-hover:bg-opacity-10">
            <div>
                <ChatIcon className="h-5 group-hover:text-[#1d9bf0]" />
            </div>
            {comments.length > 0 && (
                <span className="group-hover:text-[#1d9bf0] text-sm">
                    {comments.length}
                </span>
            )}
        </div>
    )
}

import {
    BsChatRightText as ChatIcon,
} from "react-icons/bs";
import { usePopperTooltip } from "react-popper-tooltip";
import "react-popper-tooltip/dist/styles.css";

export const CommentIcon = (comments: string[]) => {
    const {
        getArrowProps,
        getTooltipProps,
        setTooltipRef,
        setTriggerRef,
        visible,
    } = usePopperTooltip();

    return (
        <div className="icon group-hover:bg-[#1d9bf0] group-hover:bg-opacity-10">
            <div ref={setTriggerRef}>
                <ChatIcon className="h-5 group-hover:text-[#1d9bf0]" />
            </div>
            {visible && (
                <div
                    ref={setTooltipRef}
                    {...getTooltipProps({ className: 'tooltip-container fontSize: 1rem' })}
                >
                    <div {...getArrowProps({ className: 'tooltip-arrow' })} />
                    Comment
                </div>
            )}
            {comments.length > 0 && (
                <span className="group-hover:text-[#1d9bf0] text-sm">
                    {comments.length}
                </span>
            )}
        </div>
    )
}

import { DocumentData } from "firebase/firestore"
import { MyPost } from "./Post"

interface CommentProps {
  
}

export const Comment = (props: CommentProps) => {
    const { id, post, postPage } = props;

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
                    <div>
                        <div>
                            <h4>

                            </h4>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

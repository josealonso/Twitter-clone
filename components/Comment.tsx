import { DocumentData } from "firebase/firestore"
import { MyPost } from "./Post"

interface CommentProps {
  
}

export const Comment = (props: CommentProps) => {
    const { id, post, postPage } = props;

    return (
        <div className="p-3 flex cursor-pointer border-b
         border-gray-700">
            <img
                src={comment?.userImg}
                alt=""
                className="h-11 w-11 rounded-full mr-4"
            />
            <div className="flex flex-col space-y-2 w-full">
                <div className="flex justify-between">
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

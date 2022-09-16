import { collection, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import router from "next/router";
import { FaTrash as TrashIcon } from "react-icons/fa";
import { HiSwitchHorizontal } from "react-icons/hi";
import { db } from "../configs/firebase";

interface Props {
    idUser: string
    idPost: string
}

export const TrashIconComponent = ({ idUser, idPost }: Props) => {

    return (
        <div>
            {idUser === idPost ? (
                <div
                    className="flex items-center space-x-1 group"
                    onClick={(e) => {
                        console.log("TRASHIcon - idUser: ", idUser);
                        console.log("TRASHIcon - idPost: ", idPost);
                        e.stopPropagation();
                        console.log("TRASHIcon - posts: ",
                            query(
                                collection(db, "posts", idPost, "comments"),
                                orderBy("timestamp", "desc")
                            ),
                        );
                        deleteDoc(doc(db, "posts", idPost));
                        router.push("/");
                    }}
                >
                    <div className="icon group-hover:bg-red-600/10">
                        <div>
                            <TrashIcon className="h-5 group-hover:text-red-600" />
                        </div>

                        {/* {visible && (
                            <div
                                ref={setTooltipRef}
                                {...getTooltipProps({ className: 'tooltip-container' })}>
                                <div {...getArrowProps({ className: 'tooltip' })}>
                                    Delete
                                </div>
                            </div>
                        )} */}
                    </div>
                </div>
            ) : (
                <div className="flex items-center space-x-1 group">
                    <div className="icon group-hover:bg-green-500/10">
                        <HiSwitchHorizontal className="h-5 group-hover:text-green-500" />
                    </div>
                </div>
            )}
        </div>
    )
};

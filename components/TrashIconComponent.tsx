import { Session } from "next-auth";
import router from "next/router";
import { FaTrash as TrashIcon } from "react-icons/fa";
import { HiSwitchHorizontal } from "react-icons/hi";
import { MyPost } from "./Post";
import { DeleteConfirmation } from "./DeleteConfirmation";
import { useState } from "react";

interface DeleteComponentProps {
    session: Session | null;
    post: MyPost
    id: number
}

export const TrashIconComponent = ({ session, id, post }: DeleteComponentProps) => {

    const [isAlertOpen, setIsAlertOpen] = useState(false);

    const openDialog = () => {
        setIsAlertOpen(true);
    }
    /* IMP ---> post.id != id */
    const closeDialog = () => {
        setIsAlertOpen(false);
    }

    return (
        <div>

            {/* {session?.user?.id === post.id ? ( */}
            {1 === 1 ? ( 
                <div
                    className="tw-flex tw-items-center tw-space-x-1 tw-group"
                    onClick={(e) => {
                        // console.log("TRASHIcon - idUser: ", session?.user.id);
                        // console.log("TRASHIcon - idPost: ", post.id);
                        e.stopPropagation();
                        openDialog();
                        router.push("/");
                    }}
                >
                    <div className="tw-icon group-hover:tw-bg-red-600/10">
                        <div>
                            <TrashIcon className="h-5 group-hover:text-red-600" />
                            <DeleteConfirmation isDialogOpened={isAlertOpen}
                                handleCloseDialog={closeDialog} id={id} />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="tw-flex tw-items-center tw-space-x-1 tw-group">
                    <div className="tw-icon group-hover:tw-bg-green-500/10">
                        <HiSwitchHorizontal className="tw-h-5 group-hover:tw-text-green-500" />
                    </div>
                </div>
            )
            }
        </div >
    )
};

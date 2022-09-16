import { collection, deleteDoc, doc, onSnapshot, setDoc } from "firebase/firestore";
import { Session } from "next-auth";
import { useEffect, useState } from "react";
import {
    BsSuitHeart as HeartIcon,
    BsSuitHeartFill as HeartIconFilled
} from "react-icons/bs";
import { db } from "../configs/firebase";

interface Like {
    id: string | number
}

interface LikeProps {
    // idUser: string
    // idPost: string
    session: Session | null;
    id: number
}

export const LikesComponent = ({ session, id }: LikeProps) => {
    const [likes, setLikes] = useState([]);
    const [liked, setLiked] = useState(false);

    useEffect(
        () =>
            onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
                setLikes(snapshot.docs)
            ),
        [db, id]
    );

    useEffect(
        () =>
            setLiked(
                likes.findIndex((like: Like) => like.id === session?.user?.id) !== -1
            ),
        [likes]
    );

    const likePost = async () => {
        if (liked) {
            await deleteDoc(doc(db, "posts", id, "likes", session.user?.id));
        } else {
            await setDoc(doc(db, "posts", id, "likes", session.user?.id), {
                username: session?.user?.name,
            });
        }
    };

    return (
        <div
            className="flex items-center space-x-1 group"
            onClick={(e) => {
                e.stopPropagation();
                likePost();
            }}
        >
            <div className="icon group-hover:bg-pink-600/10">
                {liked ? (
                    <HeartIconFilled className="h-5 text-pink-600" />
                ) : (
                    <HeartIcon className="h-5 group-hover:text-pink-600" />
                )}
            </div>
            {likes.length > 0 && (
                <span
                    className={`group-hover:text-pink-600 text-sm ${liked && "text-pink-600"
                        }`}
                >
                    {likes.length}
                </span>
            )}
        </div>
    )
}

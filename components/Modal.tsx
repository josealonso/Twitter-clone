import { addDoc, collection, doc, DocumentData, onSnapshot, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { modalState, postIdState } from "../atoms/modelAtom";
import { db } from "../configs/firebase";

interface ModalProps {

}

export const Modal = (props: ModalProps) => {
    const { data: session } = useSession();
    const [isOpen, setIsOpen] = useRecoilState(modalState);
    const [postId, setPostId] = useRecoilState(postIdState);
    const [post, setPost] = useState<DocumentData>();
    const [comment, setComment] = useState("");
    const router = useRouter();

    useEffect(
        () =>
            onSnapshot(doc(db, "posts", postId), (snapshot) => {
                setPost(snapshot.data());
            }),
        [db]
    );

    const sendComment = async () => {
        // @ts-ignore
        e.preventDefault();

        await addDoc(collection(db, "posts", postId, "comments"), {
            comment: comment,
            username: session?.user?.name,
            // @ts-ignore
            tag: session?.user?.tag,
            userImg: session?.user?.image,
            timestamp: serverTimestamp(),
        });

        setIsOpen(false);
        setComment("");

        router.push(`/${postId}`);
    }

    return (
        <div>

        </div>
    )
}
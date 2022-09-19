import React, { useRef, useState } from "react"
import { BsFillCalendarDayFill as CalendarIcon } from "react-icons/bs";
import { FaChartBar as ChartBarIcon } from "react-icons/fa";
import { RiRemixiconLine as XIcon } from "react-icons/ri";
import { HiOutlineEmojiHappy as EmojiHappyIcon, HiPhotograph as PhotographIcon } from "react-icons/hi";
import { EmojiProps } from "emoji-mart";
import data from "@emoji-mart/data";
// @ts-ignore
import Picker from "@emoji-mart/react";
import { db, storage } from "../configs/firebase";
import {
    addDoc,
    collection,
    doc,
    serverTimestamp,
    updateDoc,
} from "@firebase/firestore";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import { useSession } from "next-auth/react";


export const Input = () => {
    const [input, setInput] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [showEmojis, setShowEmojis] = useState(false);
    const [loading, setLoading] = useState(false);
    const filePickerRef = useRef<HTMLInputElement>(null);

    const { data: session } = useSession();

    const sendPost = async () => {
        if (loading) return;
        setLoading(true);

        const docRef = await addDoc(collection(db, "posts"), {
            // @ts-ignore
            id: session?.user?.id,
            username: session?.user?.name,
            userImg: session?.user?.image,
            // @ts-ignore
            tag: session?.user?.tag,
            text: input,
            timestamp: serverTimestamp(),
        });

        const imageRef = ref(storage, `posts/${docRef.id}/image`);

        if (selectedFile) {
            await uploadString(imageRef, selectedFile, "data_url").then(async () => {
                const downloadURL = await getDownloadURL(imageRef);
                await updateDoc(doc(db, "posts", docRef.id), {
                    image: downloadURL,
                });
            });
        }

        setLoading(false);
        setInput("");
        setSelectedFile(null);
        setShowEmojis(false);
    };


    const addImageToPost = (event: React.ChangeEvent<HTMLInputElement> | null) => {
        // @ts-ignore
        const enteredFile = event?.target?.files?.length > 0 ? event.target.files[0] : undefined;
        const fileReader = new FileReader();
        if (enteredFile) {
            fileReader.readAsDataURL(enteredFile);  // Blob type
        }

        fileReader.onload = (readerEvent) => {
            let contents = readerEvent.target?.result;
            // @ts-ignore
            setSelectedFile(contents);
        };
    };

    const addEmoji = (event: EmojiProps) => {
        console.log("INSIDE addEmoji !!");
        console.log("emoji: ", event);
        let emojiText = event.native;
        console.log("emojiText: ", emojiText);
        setInput(input + emojiText);
    };

    return (
        <div
            className={`tw-border-b tw-border-gray-700 tw-p-3 tw-flex tw-gap-x-3
            tw-overflow-y-scroll tw-scrollbar-hide`} >
            <img
                // @ts-ignore
                src={session?.user?.image}
                alt=""
                className="tw-h-11 tw-w-11 tw-rounded-full tw-cursor-pointer"
            />
            <div className="tw-w-full tw-divide-y tw-divide-gray-700">
                <div className={`${selectedFile && "pb-7"} ${input && "space-y-2.5"}`}>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        rows={2}
                        placeholder="What's happening?"
                        className="tw-bg-transparent tw-outline-none tw-text-[#d9d9d9]
                        tw-text-lg tw-placeholder-gray-500 tw-tracking-wide tw-w-full
                        tw-min-h[50px]"
                    />

                    {selectedFile && (
                        <div className="tw-relative">
                            <div className="tw-absolute tw-w-8 tw-h-8 tw-bg-[#15181c] hover:tw-bg-[#272c26]
                        tw-bg-opacity-75 tw-rounded-full tw-flex tw-items-center 
                        tw-justify-center tw-top-1 tw-left-1 
                        tw-cursor-pointer"
                                onClick={() => setSelectedFile(null)}
                            >
                                <XIcon className="tw-text-white tw-h-5" />
                            </div>
                            <img
                                src="{selectedFile}"
                                alt=""
                                className="tw-rounded-2xl tw-max-h-80 tw-object-contain"
                            />
                        </div>
                    )}
                </div>
                {!loading && (
                    <div className="tw-flex tw-items-center tw-justify-between tw-pt-2.5">
                        <div className="tw-flex tw-items-center">
                            <div
                                className="tw-icon"
                                onClick={() => filePickerRef.current?.click()}
                            >
                                <PhotographIcon className="tw-text-[#1d9bf0] tw-h-[22px]" />
                                <input
                                    type="file"
                                    ref={filePickerRef}
                                    hidden
                                    onChange={addImageToPost}
                                />
                            </div>

                            <div className="tw-icon tw-rotate-90">
                                <ChartBarIcon className="tw-text-[#1d9bf0] tw-h-[22px]" />
                            </div>

                            <div className="tw-icon" onClick={() => setShowEmojis(!showEmojis)}>
                                <EmojiHappyIcon className="tw-text-[#1d9bf0] tw-h-[22px]" />
                            </div>

                            <div className="tw-icon">
                                <CalendarIcon className="tw-text-[#1d9bf0] tw-h-[22px]" />
                            </div>

                            <div
                                style={{
                                    position: "absolute",
                                    marginTop: "500px",
                                    marginRight: "60px",
                                    maxWidth: "320px",
                                    borderRadius: "30px",
                                }}>
                                {showEmojis && (
                                    <Picker data={data}
                                        onEmojiSelect={addEmoji}
                                        theme="dark"
                                    />
                                )}
                            </div>
                        </div>
                        <button
                            className="tw-bg-[#1d9bf0] tw-text-white tw-rounded-full tw-px-4 tw-py-1.5 tw-font-bold tw-shadow-md hover:tw-bg-[#1a8cd8] disabled:hover:tw-bg-[#1d9bf0] disabled:tw-opacity-50 disabled:tw-cursor-default"
                            disabled={!input && !selectedFile}
                            onClick={sendPost}
                        >
                            Tweet
                        </button>
                    </div>
                )}
            </div>
        </div>

    );
}


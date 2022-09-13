import React, { useRef, useState } from "react"
import { BsFillCalendarDayFill as CalendarIcon } from "react-icons/bs";
import { FaChartBar as ChartBarIcon } from "react-icons/fa";
import { RiRemixiconLine as XIcon } from "react-icons/ri";
import { HiOutlineEmojiHappy as EmojiHappyIcon , HiPhotograph as PhotographIcon } from "react-icons/hi";
// import 'emoji-mart/css/emoji-mart.css';
import { EmojiData, Picker } from "emoji-mart";
import { db, storage } from "../configs/firebase";
import {
    addDoc,
    collection,
    doc,
    serverTimestamp,
    updateDoc,
} from "@firebase/firestore";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import { Emoji } from "emoji-mart/dist-es/utils/data";

export const Input = () => {
    const [input, setInput] = useState("");
    const [selectedFile, setSelectedFile] = useState("");
    const [showEmojis, setShowEmojis] = useState(true);   // (false);
    const [loading, setLoading] = useState(false);
    const filePickerRef = useRef<HTMLInputElement>(null);

    // Upload posts to firebase
    const sendPost = () => {
        console.log("This is sendPost !!");
    }
    // const sendPost = async () => {
    //     if (loading) return;
    //     setLoading(true);

    //     const docRef = await addDoc(collection(db, "posts"), {
    //         // id: session.user.id,
    //         // username: session.user.name,
    //         // userImg: session.user.image,
    //         // tag: session.user.tag,
    //         text: input,
    //         timestamp: serverTimestamp(),
    //     });

    //     const imageRef = ref(storage, `posts/${docRef.id}/image`);

    // if (selectedFile) {
    //     await uploadString(imageRef, selectedFile, "data_url").then(async () => {
    //         const downloadURL = await getDownloadURL(imageRef);
    //         await updateDoc(doc(db, "posts", docRef.id), {
    //             image: downloadURL,
    //         });
    //     });
    // }

    // setLoading(false);   // Error: Too many re-renders
    // setInput("");
    // setSelectedFile("");
    // setShowEmojis(false);

    // const setInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    // const setInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    //     const value = event.target.value;
    // }

    const addImageToPost = (event: React.ChangeEvent<HTMLInputElement>) => {
        emoji = 23;
        const enteredFile = event.target.files ? event.target.files[0] : undefined;
        const fileReader = new FileReader();
        if (enteredFile) {
            fileReader.readAsDataURL(enteredFile);  // Blob type
        }

        fileReader.onload = (event) => {
            let contents = event?.target?.result;
            // setSelectedFile(contents as string);
            // setSelectedFile(event?.target?.result);
        };
    };

    // This function is triggered when the select changes
    // const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //     const value = event.target.value;
    //     setSelectedOption(value);
    // };

    // const addEmoji = (event: React.ChangeEvent<EmojiData>) => {
    // const addEmoji = (event: EmojiData) => {
    //     console.log("INSIDE addEmoji !!");
    // let sym: Emoji = event as Emoji;
    // let emojiInString = sym.unified ? sym.unified.split("-") : undefined;
    // if (emojiInString) {
    //     let codeArray: number[] = [];
    //     emojiInString.forEach((el: string) => codeArray.push(parseInt("0x" + el)));
    //     let emojiValue = String.fromCodePoint(...codeArray);
    //     setInput(input + emojiValue);
    // }
    // };

    return (
        <div
            className={`border-b border-gray-700 p-3 flex gap-x-3
        overflow-y-scroll scrollbar-hide`} >
            <img
                src="https://lh3.googleusercontent.com/a/....."
                alt=""
                className="h-11 w-11 rounded-full cursor-pointer"
            />
            <div className="w-full divide-y divide-gray-700">
                <div className={`${selectedFile && "pb-7"} ${input && "space-y-2.5"}`}>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        rows={2}
                        placeholder="What's happening?"
                        className="bg-transparent outline-none text-[#d9d9d9]
                        text-lg placeholder-gray-500 tracking-wide w-full
                        min-h[50px]"
                    />

                    {selectedFile && (
                        <div className="relative">
                            <div className="absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26]
                        bg-opacity-75 rounded-full flex items-center 
                        justify-center top-1 left-1 
                        cursor-pointer"
                                onClick={() => setSelectedFile("")}>
                                <XIcon className="text-white h-5" />
                            </div>
                            <img
                                src="{selectedFile}"
                                alt=""
                                className="rounded-2xl max-h-80 object-contain"
                            />
                        </div>
                    )}
                </div>
                {!loading && (
                    <div className="flex items-center justify-between pt-2.5">
                        <div className="flex items-center">
                            <div
                                className="icon"
                                onClick={() => filePickerRef.current?.click()}
                            >
                                <PhotographIcon className="text-[#1d9bf0] h-[22px]" />
                                <input
                                    type="file"
                                    ref={filePickerRef}
                                    hidden
                                    onChange={addImageToPost}
                                />
                            </div>

                            <div className="icon rotate-90">
                                <ChartBarIcon className="text-[#1d9bf0] h-[22px]" />
                            </div>

                            <div className="icon" onClick={() => setShowEmojis(!showEmojis)}>
                                <EmojiHappyIcon className="text-[#1d9bf0] h-[22px]" />
                            </div>

                            <div className="icon">
                                <CalendarIcon className="text-[#1d9bf0] h-[22px]" />
                            </div>

                        </div>
                        <button
                            className="bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default"
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
import { useRef, useState } from "react"
import { IconBase } from "react-icons";
import { BsFillCalendarDayFill } from "react-icons/bs";
import { FaChartBar } from "react-icons/fa";
import { RiRemixiconLine as XIcon } from "react-icons/ri";
import { HiOutlineEmojiHappy, HiPhotograph } from "react-icons/hi";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import { db, storage } from "../configs/firebase";
import {
    addDoc,
    collection,
    doc,
    serverTimestamp,
    updateDoc,
} from "@firebase/firestore";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";

export const Input = () => {
    const [input, setInput] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [showEmojis, setShowEmojis] = useState(false);
    const [loading, setLoading] = useState(false);
    const filePickerRef = useRef(null);

    // Upload posts to firebase
    const sendPost = () => {
        if (loading) return;
        setLoading(true);

        const docRef = await addDoc(collection(db, "posts"), {
            // id: session.user.id,
            // username: session.user.name,
            // userImg: session.user.image,
            // tag: session.user.tag,
            text: input,
            timestamp: serverTimestamp(),
        });

        const imageRef = ref(storage, `posts/${docRef.id}/image`);
    };

    const addImageToPost = () => { };

    const addEmoji = (e: any) => {
        let sym = e.unified.split("-");
        let codeArray: string[] = [];
        sym.forEach((el: string) => codeArray.push("0x" + el));
        let emoji = String.fromCodePoint(...codeArray);
        setInput(input + emoji);
    };

    return (
        <div
            className={`border-b border-gray-700 p-3 flex gap-x-3
        overflow-y-scroll`}
        >
            <img
                src="https://lh3.googleusercontent.com/a/....."
                alt=""
                className="h-11 w-11 rounded-full cursor-pointer"
            />
            <div className="w-full divide-y divide-gray-700">
                <div className={``}>
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
                        cursor-pointer" onClick={() => setSelectedFile(null)}>
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

                <div className="flex items-center justify-between pt-2.5">
                    <div className="flex items-center">
                        <div className="icon" onClick={() =>
                            filePickerRef.current.click()}>
                            <HiPhotograph className="h-[22px] text-[#1d9bf0]"
                            />
                            <input
                                type="file"
                                hidden
                                onChange={addImageToPost}
                                ref={filePickerRef} />
                        </div>

                        <div className="icon rotate-90" onClick={() => { }>
                            <FaChartBar className="text-[#1d9bf0] h-[22px]" />
                        </div>

                        <div className="icon" onClick={() => setShowEmojis
                            (!showEmojis)}>
                            <HiOutlineEmojiHappy className="text-[#1d9bf0] h-[22px]"
                            />
                        </div>

                        <div className="icon" onClick={() => { }>
                            <BsFillCalendarDayFill className="text-[#1d9bf0] h-[22px]" />
                        </div>

                        {showEmojis && (
                            <Picker
                                onSelect(e)=> {addEmoji(e)}
                        style={{
                            position: "absolute",
                            marginTop: "465px",
                            marginLeft: -40,
                            maxWidth: "320px",
                            borderRadius: "20px",
                        }}
                        theme="dark"
                            />
                        )}
                    </div>
                </div>
            </div>
        </div >
    )
}

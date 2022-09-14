import Image from "next/image";
import { SidebarLink } from "./SidebarLink";
import {
    AiFillHome as HomeIcon, AiOutlineBell as BellIcon,
    AiOutlineInbox as InboxIcon, AiOutlineUser as UserIcon,
} from "react-icons/ai";
import { FaHashtag as HashtagIcon } from "react-icons/fa";
import { TbClipboardList as ClipboardListIcon } from "react-icons/tb";
import { BsBookmark as BookmarkIcon, BsThreeDots as HorizontalDots } from "react-icons/bs";
import { VscCircleLargeOutline as DotsCircleHorizontalIcon } from "react-icons/vsc";
import { useSession, signOut } from "next-auth/react";

export const Sidebar = () => {
    const { data: session } = useSession();

    return (
        <div className="hidden sm:flex flex-col items-center
         xl:items-start xl:w-[340px] p-2 fixed h-full">
            <div className="flex items-center justify-center w-14 h-14
            hoverAnimation p-0 xl:ml-24">
                <Image src="https://rb.gy/ogau5a" width={30} height={30} />
            </div>
            <div className="space-y-2.5 mt-4 mb-2.5 xl:ml-24">
                <SidebarLink text="Home" icon={HomeIcon} active />
                <SidebarLink text="Explore" icon={HashtagIcon} />
                <SidebarLink text="Notifications" icon={BellIcon} />
                <SidebarLink text="Messages" icon={InboxIcon} />
                <SidebarLink text="Bookmarks" icon={BookmarkIcon} />
                <SidebarLink text="Lists" icon={ClipboardListIcon} />
                <SidebarLink text="Profile" icon={UserIcon} />
                <SidebarLink text="More" icon={DotsCircleHorizontalIcon} />
            </div>
            <button className="hidden xl:inline ml-auto bg-[#155682] text-white
            rounded-full w-56 h-[52px] text-lg font-bold shadow-md hover:bg-[#1a8cd8]">
                Tweet
            </button>
            <div className="text-[#d9d9d9] flex items-center
            justify-center hoverAnimation xl:ml-auto xl:-mr-5 mt-auto"
                onClick={signOut}
            >
                <img
                    src={session?.user?.image}
                    alt={session?.user?.name}
                    className="h-10 w-10 rounded-full xl:mr-2.5"
                />
                <div className="hidden xl:inline leading-5">
                    <h4 className="font-bold">{session?.user?.name}</h4>
                    <p className="text-[#6e767d]">@{session?.user?.tag}</p>
                </div>
                <HorizontalDots className="h-5 hidden xl:inline ml-10"
                />
            </div>
        </div>
    );
}

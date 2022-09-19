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
        <div className="tw-hidden sm:tw-flex tw-flex-col tw-items-center
         xl:tw-items-start xl:tw-w-[340px] tw-p-2 tw-fixed tw-h-full">
            <div className="tw-flex tw-items-center tw-justify-center tw-w-14 tw-h-14
            hoverAnimation tw-p-0 xl:tw-ml-24">
                <Image src="https://rb.gy/ogau5a" width={30} height={30} />
            </div>
            <div className="tw-space-y-2.5 tw-mt-4 tw-mb-2.5 xl:tw-ml-24">
                <SidebarLink text="Home" icon={HomeIcon} active />
                <SidebarLink text="Explore" icon={HashtagIcon} />
                <SidebarLink text="Notifications" icon={BellIcon} />
                <SidebarLink text="Messages" icon={InboxIcon} />
                <SidebarLink text="Bookmarks" icon={BookmarkIcon} />
                <SidebarLink text="Lists" icon={ClipboardListIcon} />
                <SidebarLink text="Profile" icon={UserIcon} />
                <SidebarLink text="More" icon={DotsCircleHorizontalIcon} />
            </div>
            <button className="tw-hidden xl:tw-inline tw-ml-auto tw-bg-[#155682] tw-text-white
            tw-rounded-full tw-w-56 tw-h-[52px] tw-text-lg tw-font-bold tw-shadow-md hover:tw-bg-[#1a8cd8]">
                Tweet
            </button>
            <div className="tw-text-[#d9d9d9] tw-flex tw-items-center
            tw-justify-center hoverAnimation xl:tw-ml-auto xl:tw--mr-5 tw-mt-auto"
                // @ts-ignore
                onClick={signOut}
            >
                <img
                    // @ts-ignore
                    src={session?.user?.image}
                    // @ts-ignore
                    alt={session?.user?.name}
                    className="tw-h-10 tw-w-10 tw-rounded-full xl:tw-mr-2.5"
                />
                <div className="tw-hidden xl:tw-inline tw-leading-5">
                    <h4 className="tw-font-bold">{session?.user?.name}</h4>
                    {/* @ts-ignore */}
                    <p className="tw-text-[#6e767d]">@{session?.user?.tag}</p>
                </div>
                <HorizontalDots className="tw-h-5 tw-hidden tw-xl:inline tw-ml-10"
                />
            </div>
        </div>
    );
}

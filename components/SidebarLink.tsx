import Image from "next/image";
import { IconType } from "react-icons";

interface SidebarLinkProps {
    image: IconType;
    text: string;
    active?: any;
}

// export const SidebarLink = ({ icon, text, active }) => {
export const SidebarLink = (props: SidebarLinkProps) => {
    const { image, text, active } = props;
    return (
        <div
            className={`text-[#d9d9d9] flex items-center justify-center
        xl:justify-start text-xl space-x-3 hoverAnimation ${active && "font-bold"
                }`}
        >
            <img src={image.toString()} className="h-7" />
            <span className="hidden xl:inline">{text}</span>
        </div>
    )
}
import Image from "next/image";
import React from "react";
import { IconBase, IconType } from "react-icons";
// import styles from '../styles/globals.css';

interface SidebarLinkProps {
    // image: string;  //IconType;
    icon: IconType // JSX.Element;
    text: string;
    active?: any;
}

// export const SidebarLink = ({ icon, text, active }) => {
export const SidebarLink = (props: SidebarLinkProps) => {
    const { icon, text, active } = props;
    return (
        <div
            className={`tw-text-[#d9d9d9] tw-flex tw-items-center tw-justify-center
        xl:tw-justify-start tw-text-xl tw-space-x-3 hoverAnimation 
        ${active && "tw-font-bold"
                }`}> 
            <span className="h-7">{React.createElement(icon)}</span>
            
            <span className="tw-hidden tw-xl:inline">{text}</span>
        </div>
    )
}
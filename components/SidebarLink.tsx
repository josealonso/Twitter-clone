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
            className={`text-[#d9d9d9] flex items-center justify-center
        xl:justify-start text-xl space-x-3 hoverAnimation 
        ${active && "font-bold"
                }`}> 
            <span className="h-7">{React.createElement(icon)}</span>
            
            <span className="hidden xl:inline">{text}</span>
        </div>
    )
}
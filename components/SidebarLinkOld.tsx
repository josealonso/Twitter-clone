import Image from "next/image";
import React from "react";
import { IconBase, IconType } from "react-icons";

interface SidebarLinkProps {
    icon: IconType // JSX.Element;
    text: string;
    active?: any;
}

// export const SidebarLink = ({ icon, text, active }) => {
export const SidebarLinkOld = (props: SidebarLinkProps) => {
    const { icon, text, active } = props;
    return (
        <div className="text-white">
            {/* <span className="h-7">{React.createElement(icon)}</span> */}
            {/* <span className="h-7">{text}</span> */}
            <span style={{height: "6px", color: "yellow"}}>{text}</span>
        </div>
    )
}
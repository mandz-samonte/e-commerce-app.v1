import classNames from "classnames";
import React, { cloneElement, useRef, useState, useEffect } from "react";
import { AiOutlineDown } from "react-icons/ai";

export default function Accordion({ children, title, className, titleClassName }) {
    const [visible, setVisible] = useState(false);
    const childrenRef = useRef();

    return (
        <div className={classNames("flex flex-col", className)}>
            <div
                onClick={() => setVisible(!visible)}
                className={classNames("flex items-center justify-between cursor-pointer", titleClassName)}
            >
                <span>{title}</span>
                <AiOutlineDown className={classNames("transition-all duration-300", { "-rotate-90": !visible })} />
            </div>

            <div
                style={{
                    height: `${visible ? childrenRef.current?.clientHeight : 0}px`,
                }}
                className={classNames("transition-all overflow-hidden duration-300")}
            >
                {cloneElement(children, { ref: childrenRef })}
            </div>
        </div>
    );
}

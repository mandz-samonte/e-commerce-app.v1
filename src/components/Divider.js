import classNames from "classnames";
import React from "react";

export default function Divider({ children, textClassName, className }) {
    const lineClassName = "w-full h-px bg-zinc-200";

    if (!children) return <div className={classNames(lineClassName)}></div>;

    return (
        <div className={classNames("w-full flex items-center gap-x-5 flex-shrink-0 my-5", className)}>
            <div className={lineClassName}></div>
            <span className={classNames("text-xs text-gray-400", textClassName)}>{children}</span>
            <div className={lineClassName}></div>
        </div>
    );
}

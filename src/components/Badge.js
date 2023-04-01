import classNames from "classnames";
import React from "react";

export default function Badge({ className, badgeClassName, children, content }) {
    return (
        <div className={classNames("relative", className)}>
            <div
                style={{ fontSize: "9px" }}
                className={classNames(
                    "rounded-full bg-red-500 absolute top-0 right-0 -translate-y-1/2 translate-x-1/2",
                    {
                        "w-3 h-3": !content,
                        "px-1.5 py-1 leading-none text-white": content,
                    },
                    badgeClassName
                )}
            >
                {content}
            </div>
            {children}
        </div>
    );
}

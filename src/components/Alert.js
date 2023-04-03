import classNames from "classnames";
import React from "react";

import { AiFillCheckCircle, AiFillWarning, AiFillInfoCircle, AiFillCloseCircle } from "react-icons/ai";
import { BsCircleFill } from "react-icons/bs";

export default function Alert({
    success = false,
    warning = false,
    info = false,
    error = false,
    children,
    className,
    text,
    ...props
}) {
    const rootClass = classNames("px-5 py-3 rounded-lg border border-black flex items-start gap-x-2", className, {
        "bg-green-50 border-green-500 text-green-600 ": success,
        "bg-amber-50 border-amber-500 text-amber-600 ": warning,
        "bg-blue-50 border-blue-500 text-blue-600 ": info,
        "bg-red-50 border-red-500 text-red-600 ": error,
    });

    const iconClass = "mt-1";

    const RenderIcon = () => {
        if (success) return <AiFillCheckCircle className={iconClass} />;
        if (warning) return <AiFillWarning className={iconClass} />;
        if (info) return <AiFillInfoCircle className={iconClass} />;
        if (error) return <AiFillCloseCircle className={iconClass} />;
        return <BsCircleFill className={iconClass} />;
    };

    return (
        <div className={rootClass} {...props}>
            <RenderIcon />
            {children || text}
        </div>
    );
}

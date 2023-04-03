import classNames from "classnames";
import React, { Children } from "react";
import { Link } from "react-router-dom";
import { SyncLoader } from "react-spinners";

export function PrimaryButton({ className, children, ...props }) {
    const rootClassName = classNames("bg-amber-500", className);
    return (
        <Button className={rootClassName} {...props}>
            {children}
        </Button>
    );
}

export function SecondaryButton({ className, children, ...props }) {
    const rootClassName = classNames("border border-gray-200", className);
    return (
        <Button className={rootClassName} {...props}>
            {children}
        </Button>
    );
}

export default function Button({ to, href, className, children, loading, ...props }) {
    const rootClassName = classNames("px-5 py-3 rounded-lg font-semibold uppercase", className);

    if (to)
        return (
            <Link to={to} className={rootClassName} {...props}>
                {loading ? (
                    <SyncLoader speedMultiplier={0.5} margin={2} size={10} color="#ffffff" className="mx-auto" />
                ) : (
                    children
                )}
            </Link>
        );

    if (href)
        return (
            <a href={href} className={rootClassName} {...props}>
                {loading ? (
                    <SyncLoader speedMultiplier={0.5} margin={2} size={10} color="#ffffff" className="mx-auto" />
                ) : (
                    children
                )}
            </a>
        );
    return (
        <button className={rootClassName} {...props}>
            {loading ? (
                <SyncLoader speedMultiplier={0.75} margin={3} size={10} color="#ffffff" className="mx-auto" />
            ) : (
                children
            )}
        </button>
    );
}

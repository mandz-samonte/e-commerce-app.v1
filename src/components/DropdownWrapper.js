import ReactDOM from "react-dom";
import classNames from "classnames";
import useOutsideTapHandler from "../utils/useOutsideTapHandler";
import { useEffect, useRef, useState } from "react";
import { Component } from "react";

export const ORIGIN_TOP_LEFT = "top-left";
export const ORIGIN_TOP_RIGHT = "top-right";
export const ORIGIN_BOTTOM_LEFT = "bottom-left";
export const ORIGIN_BOTTOM_RIGHT = "bottom-right";

export function reposition(anchor, rootRef, preferredOrigin, setRenderOrigin, yOffset) {
    if (!anchor || !rootRef.current) return;
    const targetBounds = anchor.getBoundingClientRect();
    const menuBounds = rootRef.current.getBoundingClientRect();
    let xOrigin = "left",
        yOrigin = "top";

    console.log(targetBounds);

    let left = [ORIGIN_TOP_LEFT, ORIGIN_BOTTOM_LEFT].includes(preferredOrigin) ? targetBounds.left : targetBounds.right,
        top = targetBounds.bottom + yOffset;

    console.log(window.innerWidth - targetBounds.right + "px");

    rootRef.current.style.left = targetBounds.right - menuBounds.width + "px";

    // if (left + menuBounds.width > window.innerWidth) {
    //     rootRef.current.style.right = window.innerWidth - targetBounds.right + "px";
    //     xOrigin = "right";
    // } else {
    //     rootRef.current.style.left = left + "px";
    // }

    if (top + menuBounds.height > window.innerHeight) {
        rootRef.current.style.bottom = window.innerHeight - targetBounds.top + yOffset + "px";
        rootRef.current.style.top = null;
        yOrigin = "bottom";
    } else {
        rootRef.current.style.top = top + "px";
        rootRef.current.style.bottom = null;
    }

    if (targetBounds.width > menuBounds.width) {
        rootRef.current.style.minWidth = targetBounds.width + "px";
    }

    // setRenderOrigin(yOrigin + "-" + xOrigin);
    setRenderOrigin("bottom-left");
}

export default function DropdownWrapper({
    anchor,
    preferredOrigin = ORIGIN_TOP_LEFT,
    children,
    visible,
    onTapOutside,
    animate = true,
    triggerTapOutsideOnBlur = false,
    yOffset = 5,
}) {
    const [renderOrigin, setRenderOrigin] = useState(preferredOrigin);
    const [animating, setAnimating] = useState(true);
    const rootRef = useRef();
    useOutsideTapHandler(rootRef, onTapOutside || (() => null), triggerTapOutsideOnBlur);

    useEffect(() => {
        if (!anchor) return;
        const cb = () => reposition(anchor, rootRef, preferredOrigin, setRenderOrigin, yOffset);
        if (visible) {
            cb();
            window.addEventListener("scroll", cb);
        } else {
            window.removeEventListener("scroll", cb);
        }
        return () => {
            if (cb) {
                window.removeEventListener("scroll", cb);
            }
        };
    }, [visible, anchor, rootRef, preferredOrigin]);

    useEffect(() => {
        if (animate) {
            setAnimating(!visible);
        }
    }, [animate, visible]);

    return ReactDOM.createPortal(
        <div
            className={classNames("fixed z-50", {
                "scale-100": visible && (!animate || !animating),
                "scale-75": animate && animating,
                "transition-transform": animate,
                "opacity-0 pointer-events-none": !visible,
                "origin-top-left": animate && renderOrigin === ORIGIN_TOP_LEFT,
                "origin-top-right": animate && renderOrigin === ORIGIN_TOP_RIGHT,
                "origin-bottom-left": animate && renderOrigin === ORIGIN_BOTTOM_LEFT,
                "origin-bottom-right": animate && renderOrigin === ORIGIN_BOTTOM_RIGHT,
                "left-0": true,
            })}
            ref={rootRef}
        >
            {children}
        </div>,
        document.body
    );
}

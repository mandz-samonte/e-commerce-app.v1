import React, { forwardRef, useImperativeHandle, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toNormalCase } from "../../services/helpers";
import { GrFormClose } from "react-icons/gr";
import { AiOutlineCaretDown } from "react-icons/ai";
import DropdownWrapper, {
    ORIGIN_BOTTOM_LEFT,
    ORIGIN_BOTTOM_RIGHT,
    ORIGIN_TOP_LEFT,
    ORIGIN_TOP_RIGHT,
} from "../../components/DropdownWrapper";
import classNames from "classnames";
import useOutsideTapHandler from "../../utils/useOutsideTapHandler";

const OrderMenu = ({ children, className }) => {
    const [selected, setSelected] = useState("relevant");
    const [visible, setVisible] = useState();
    const [searchParams, setSearchParams] = useSearchParams();
    const search = useMemo(() => Object.fromEntries([...searchParams]), [searchParams]);
    const dropdownRef = useRef();
    useOutsideTapHandler(dropdownRef, () => setVisible(false), true);

    const open = () => {
        setVisible(true);
    };

    const onSelectOrder = (order) => {
        setSelected(order);
        setSearchParams({ ...search, order });
    };

    return (
        <div className={classNames("relative", className)}>
            {children(open, toNormalCase(selected.replace(/-/g, " ")))}

            <div
                className={classNames("w-64 bg-white rounded-lg absolute right-0 mt-5 flex flex-col shadow-md", {
                    "opacity-0 pointer-events-none": !visible,
                })}
                ref={dropdownRef}
            >
                <button
                    onClick={() => onSelectOrder("relevant")}
                    onSelectOrder
                    className={classNames("px-5 py-3 hover:bg-zinc-50 text-sm", {
                        "bg-zinc-50": selected === "relevant",
                    })}
                >
                    Relevant
                </button>
                <button
                    onClick={() => onSelectOrder("highest-to-lowest")}
                    onSelectOrder
                    className={classNames("px-5 py-3 hover:bg-zinc-50 text-sm", {
                        "bg-zinc-50": selected === "highest-to-lowest",
                    })}
                >
                    Price highest to lowest
                </button>
                <button
                    onClick={() => onSelectOrder("lowest-to-highest")}
                    onSelectOrder
                    className={classNames("px-5 py-3 hover:bg-zinc-50 text-sm", {
                        "bg-zinc-50": selected === "lowest-to-highest",
                    })}
                >
                    Price lowest to highest
                </button>
            </div>
        </div>
    );
};

const Filter = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const orderMenuRef = useRef();

    const objectParams = useMemo(() => {
        return Object.fromEntries([...searchParams]);
    }, [searchParams]);

    return (
        <>
            <div className="pb-4 mb-5 border-b border-zinc-200 flex items-end">
                {objectParams.category && (
                    <div className="rounded-full flex items-center pl-5 pr-3 py-2 border border-black w-fit text-xs gap-x-2">
                        {toNormalCase(objectParams.category)}{" "}
                        <GrFormClose
                            onClick={() => setSearchParams(new URLSearchParams())}
                            className="cursor-pointer text-base"
                        />
                    </div>
                )}

                <OrderMenu className="ml-auto">
                    {(open, order) => (
                        <button
                            onClick={open}
                            className="pl-5 pr-3 py-2 border border-zinc-500 rounded-lg text-xs flex items-center gap-x-2"
                        >
                            {order} <AiOutlineCaretDown />
                        </button>
                    )}
                </OrderMenu>
            </div>
        </>
    );
};

export default Filter;

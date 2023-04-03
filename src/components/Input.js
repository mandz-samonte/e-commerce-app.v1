import classNames from "classnames";
import { uniqueId } from "lodash";
import React, { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

function InputWrapper({ label, labelClassName, className, error, id, children }) {
    return (
        <div className={classNames("flex flex-col", className)}>
            {label && (
                <label htmlFor={id} className={classNames("mb-1.5 font-medium text-sm", labelClassName)}>
                    {label}
                </label>
            )}
            {children}
            {error && <span className="text-xs mt-1 text-red-500">{error}</span>}
        </div>
    );
}

export default function Input({
    className,
    label,
    labelClassName,
    error,
    inputClassName,
    prefixComponent,
    suffixComponent,
    id,
    type,
    ...props
}) {
    const htmlId = uniqueId(id || "input_");
    const [passwordVisible, setPasswordVisible] = useState(false);

    if (type === "password")
        return (
            <InputWrapper id={htmlId} className={className} label={label} error={error} labelClassName={labelClassName}>
                <div className="flex items-center bg-gray-100 rounded-lg border border-gray-300 outline-none px-5 pr-2">
                    {prefixComponent}
                    <input
                        id={htmlId}
                        type={passwordVisible ? "text" : "password"}
                        className="w-full py-3 outline-none bg-transparent mr-3"
                        {...props}
                    />
                    <button
                        type="button"
                        onClick={() => setPasswordVisible(!passwordVisible)}
                        className="p-1 flex-shrink-0 text-lg"
                    >
                        {passwordVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                    </button>
                </div>
            </InputWrapper>
        );

    if (prefixComponent || suffixComponent)
        return (
            <InputWrapper id={htmlId} className={className} label={label} error={error} labelClassName={labelClassName}>
                <div className="flex items-center bg-gray-100 rounded-lg w-[500px] ml-auto px-5">
                    {prefixComponent}
                    <input
                        id={htmlId}
                        className="w-full px-3 py-2 outline-none bg-transparent"
                        type={type}
                        {...props}
                    />
                    {suffixComponent}
                </div>
            </InputWrapper>
        );

    return (
        <InputWrapper id={htmlId} className={className} label={label} error={error} labelClassName={labelClassName}>
            <input
                id={htmlId}
                className={classNames(
                    "bg-gray-100 rounded-lg px-5 py-3 border border-gray-300 outline-none",
                    { "!border-red-500": error },
                    inputClassName
                )}
                type={type}
                {...props}
            />
        </InputWrapper>
    );
}

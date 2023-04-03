import React from "react";
import Divider from "../components/Divider";
import { FcGoogle } from "react-icons/fc";
import { SecondaryButton } from "../components/Button";

export default function AuthLayout({ children }) {
    return (
        <div className="w-full max-w-screen-xl mx-auto py-10 h-full flex">
            <div style={{ minHeight: "600px" }} className="bg-white w-full grid grid-cols-2">
                <div className="w-full h-full flex flex-col p-20">
                    {children}

                    <Divider>Or</Divider>

                    <SecondaryButton className="flex items-center justify-center normal-case font-medium gap-x-2">
                        <FcGoogle /> Sign up with Google
                    </SecondaryButton>
                </div>
                <div className="w-full h-full bg-amber-200"></div>
            </div>
        </div>
    );
}

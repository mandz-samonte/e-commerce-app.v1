import React, { useEffect } from "react";
import { ReactComponent as Logo } from "../assets/logo.svg";

import { BsSearch, BsCart2 } from "react-icons/bs";
import Badge from "./Badge";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../providers/CartProvider";
import { AiOutlineUser } from "react-icons/ai";
import { useAccount } from "../providers/AccountProvider";
import { signOut } from "firebase/auth";
import { useState } from "react";
import classNames from "classnames";
import useOutsideTapHandler from "../utils/useOutsideTapHandler";
import { useRef } from "react";

function ProfileDropdown() {
    const { auth } = useAccount();
    const rootRef = useRef();
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);
    useOutsideTapHandler(rootRef, () => setVisible(false));

    const onSignOut = async () => {
        try {
            await signOut(auth);
            navigate("/login");
        } catch (e) {
            console.log("Error Code", e.code);
            console.log("Error Message", e.message);
        }
    };

    return (
        <div ref={rootRef} className="relative">
            <button
                onClick={() => setVisible(!visible)}
                className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200"
            >
                <AiOutlineUser />
            </button>

            <div
                className={classNames(
                    "absolute top-full mt-2 rounded-lg bg-white w-64 right-0 py-1 shadow flex flex-col transition-all",
                    { "-translate-y-5 opacity-0 pointer-events-none": !visible }
                )}
            >
                <span className="px-5 py-3">Profile</span>
                <button onClick={onSignOut} className="px-5 py-3 text-left text-red-500 hover:bg-gray-100">
                    Logout
                </button>
            </div>
        </div>
    );
}

const Navbar = () => {
    const { cart } = useCart();
    const { user } = useAccount();

    return (
        <div className=" bg-white ">
            <div className="flex items-center py-5 w-full max-w-screen-xl mx-auto">
                <Link to="/">
                    <Logo className="text-red-200 mr-5" />
                </Link>
                <span className="px-3 py-2 text-sm">Track My Order</span>
                <span className="px-3 py-2 text-sm">Customer Care</span>

                <div className="flex items-center bg-gray-100 rounded-lg w-[500px] ml-auto px-5">
                    <input className=" w-full px-3 py-2 outline-none bg-transparent" />
                    <BsSearch />
                </div>

                <Badge content={cart?.length || null} className="mr-auto ml-2">
                    <Link to="/checkout" className="h-10 w-10 bg-gray-100 flex items-center justify-center rounded-lg ">
                        <BsCart2 />
                    </Link>
                </Badge>

                {user ? (
                    <ProfileDropdown />
                ) : (
                    <>
                        <Link to="/login" className="px-3 py-2 text-sm">
                            Login
                        </Link>
                        <div className="h-7 w-px bg-gray-200 mx-2"></div>
                        <Link to="/register" className="px-3 py-2 text-sm">
                            Sign Up
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Navbar;

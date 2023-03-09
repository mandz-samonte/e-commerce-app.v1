import React from "react";
import { ReactComponent as Logo } from "../assets/logo.svg";

import { BsSearch, BsCart2 } from "react-icons/bs";

const Navbar = () => {
    return (
        <div className=" bg-white">
            <div className="container flex items-center py-5">
                <Logo className="text-red-200 mr-5" />
                <span className="px-3 py-2 text-sm">Track My Order</span>
                <span className="px-3 py-2 text-sm">Customer Care</span>

                <div className="flex items-center bg-gray-50 rounded-lg w-[500px] ml-auto px-5">
                    <input className=" w-full px-3 py-2 outline-none bg-transparent" />
                    <BsSearch />
                </div>

                <button className="mr-auto ml-2 h-10 w-10 bg-gray-50 flex items-center justify-center rounded-lg ">
                    <BsCart2 />
                </button>
                <span className="px-3 py-2 text-sm">Login</span>
                <div className="h-7 w-px bg-gray-200 mx-2"></div>
                <span className="px-3 py-2 text-sm">Create Account</span>
            </div>
        </div>
    );
};

export default Navbar;

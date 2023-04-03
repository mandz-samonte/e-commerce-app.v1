import React, { useEffect } from "react";
import { ReactComponent as Logo } from "../assets/logo.svg";

import { BsSearch, BsCart2 } from "react-icons/bs";
import Badge from "./Badge";
import { Link } from "react-router-dom";
import { useCart } from "../providers/CartProvider";

const Navbar = () => {
    const { cart } = useCart();

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
                <Link to="/login" className="px-3 py-2 text-sm">
                    Login
                </Link>
                <div className="h-7 w-px bg-gray-200 mx-2"></div>
                <Link to="/register" className="px-3 py-2 text-sm">
                    Sign Up
                </Link>
            </div>
        </div>
    );
};

export default Navbar;

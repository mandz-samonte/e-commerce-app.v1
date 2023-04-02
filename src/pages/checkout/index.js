import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { BsHouseAdd } from "react-icons/bs";
import { BiTrash } from "react-icons/bi";
import { FAST_SHIPPING, FREE_SHIPPING, REGULAR_SHIPPING, useCart } from "../../providers/CartProvider";
import { map } from "lodash";
import { Link } from "react-router-dom";
import Accordion from "../../components/Accordion";

import ProductRow from "./ProductRow";

const EmptyState = () => {
    return (
        <div className="flex items-center justify-center p-5">
            <span className="text-zinc-400">
                Cart is empty, browse some product you like{" "}
                <Link to="/" className="font-medium text-black">
                    here
                </Link>
            </span>
        </div>
    );
};

const RadioButton = ({ children, className, inputClassName, ...props }) => {
    return (
        <label
            className={classNames(
                "flex items-center gap-x-3 text-sm px-4 py-3 border border-zinc-200 rounded cursor-pointer mb-2",
                className
            )}
        >
            <input type="radio" className={inputClassName} {...props} />
            {children}
        </label>
    );
};

export default function Checkout() {
    const { cart, subTotal, clearCart, shipping, shippingAmount, setShipping, totalAmount } = useCart();

    return (
        <div className="w-full max-w-screen-xl mx-auto py-10 h-full flex">
            <div style={{ height: "700px" }} className="bg-white h-full w-full my-auto divide-x flex items-center">
                <div className="flex flex-col h-full w-full py-5 px-10 divide-y">
                    <div className="flex items-center pb-5 justify-between">
                        <span className="text-2xl font-semibold">Clear</span>
                        <button
                            onClick={clearCart}
                            className="flex items-center text-sm text-zinc-600 font-medium gap-x-2 mt-2 hover:text-red-500 transition-all"
                        >
                            <BiTrash />
                            Remove All
                        </button>
                    </div>
                    {cart.length ? map(cart, (item) => <ProductRow key={item.id} product={item} />) : <EmptyState />}
                </div>

                <div className="flex flex-col h-full flex-shrink-0 w-96 overflow-y-auto pb-5 hide-scrollbar">
                    <Accordion title="Shipping Address" titleClassName="p-5">
                        <div className="flex flex-col p-5 pt-0">
                            <RadioButton name="shipping-address">
                                <div className="flex flex-col relative w-full">
                                    <span className="font-medium">Home</span>
                                    <span className="text-xs text-zinc-400">Blk 0 Lot 0, Cavite City, Philippines</span>
                                </div>
                            </RadioButton>
                            <button className="px-5 py-3 rounded-lg border border-zinc-200 text-sm flex items-center justify-center gap-x-2">
                                <BsHouseAdd />
                                Add Address
                            </button>
                        </div>
                    </Accordion>

                    <div className="flex-shrink-0 h-px w-full bg-zinc-200"></div>

                    <Accordion title="Payment Method" titleClassName="p-5">
                        <div className="grid grid-cols-2 gap-2 p-5 pt-0">
                            <RadioButton name="payment">Bank Payment</RadioButton>
                            <RadioButton name="payment">Online Wallet</RadioButton>
                            <RadioButton name="payment">Cash on Delivery</RadioButton>
                        </div>
                    </Accordion>

                    <div className="flex-shrink-0 h-px w-full bg-zinc-200"></div>

                    <Accordion title="Shipping Method" titleClassName="p-5">
                        <div className="flex flex-col p-5 pt-0">
                            <RadioButton
                                onChange={() => setShipping(FREE_SHIPPING)}
                                value={FREE_SHIPPING}
                                checked={shipping === FREE_SHIPPING}
                                name="shipping"
                            >
                                <div className="flex flex-col relative w-full">
                                    <span className="font-medium">Free Shipping</span>
                                    <span className="text-xs text-zinc-400">7-30 business days</span>
                                    <span className="absolute top-0 right-0 font-semibold">$0</span>
                                </div>
                            </RadioButton>
                            <RadioButton
                                onChange={() => setShipping(REGULAR_SHIPPING)}
                                value={REGULAR_SHIPPING}
                                checked={shipping === REGULAR_SHIPPING}
                                name="shipping"
                            >
                                <div className="flex flex-col relative w-full">
                                    <span className="font-medium">Regular Shipping</span>
                                    <span className="text-xs text-zinc-400">3-14 business days</span>
                                    <span className="absolute top-0 right-0 font-semibold">$7.50</span>
                                </div>
                            </RadioButton>
                            <RadioButton
                                onChange={() => setShipping(FAST_SHIPPING)}
                                value={FAST_SHIPPING}
                                checked={shipping === FAST_SHIPPING}
                                name="shipping"
                            >
                                <div className="flex flex-col relative w-full">
                                    <span className="font-medium">Fast Shipping</span>
                                    <span className="text-xs text-zinc-400">1-3 business days</span>
                                    <span className="absolute top-0 right-0 font-semibold">$22.50 </span>
                                </div>
                            </RadioButton>
                        </div>
                    </Accordion>

                    <div className="flex-shrink-0 h-px w-full bg-zinc-200"></div>

                    <Accordion title="Discount" titleClassName="p-5">
                        <div className="p-5 pt-0 flex flex-col">
                            <div className="flex items-center gap-x-2 w-full mb-5">
                                <input
                                    placeholder="CODE1234"
                                    className="px-3 py-2 rounded-lg border border-zinc-200 bg-zinc-100 outline-none text-sm w-full"
                                />
                                <button className="px-3 py-2 text-sm rounded-lg border border-zinc-200">Apply</button>
                            </div>

                            <div className="flex items-center overflow-x-auto gap-x-2 hide-scrollbar">
                                <RadioButton>
                                    <div className="flex flex-col relative w-full">
                                        <span className="font-medium">20%</span>
                                        <span className="text-xs text-zinc-400">Min of $200</span>
                                    </div>
                                </RadioButton>
                                <RadioButton>
                                    <div className="flex flex-col relative w-full">
                                        <span className="font-medium">$10</span>
                                        <span className="text-xs text-zinc-400">Min of $200</span>
                                    </div>
                                </RadioButton>
                                <RadioButton>
                                    <div className="flex flex-col relative w-full">
                                        <span className="font-medium">$10</span>
                                        <span className="text-xs text-zinc-400">Min of $200</span>
                                    </div>
                                </RadioButton>
                            </div>
                        </div>
                    </Accordion>

                    <div className="flex-shrink-0 h-px w-full bg-zinc-200"></div>

                    <div className="flex items-center px-5 py-3 justify-between text-xs">
                        <span className="text-zinc-400">Subtotal</span>
                        <span className="font-semibold">${subTotal}</span>
                    </div>
                    <div className="flex items-center px-5 py-3 justify-between text-xs">
                        <span className="text-zinc-400">Discount</span>
                        <span className="font-semibold">$0</span>
                    </div>
                    <div className="flex items-center px-5 py-3 justify-between text-xs">
                        <span className="text-zinc-400">Shipping Fee</span>
                        <span className="font-semibold">${shippingAmount}</span>
                    </div>

                    <div className="flex-shrink-0 h-px w-full bg-zinc-200"></div>

                    <div className="flex items-center px-5 py-3 justify-between text-md">
                        <span className="text-zinc-400 text-xs">Total</span>
                        <span className="font-bold">${totalAmount || "00.00"}</span>
                    </div>

                    <button className="bg-amber-500 rounded-lg px-5 py-3 font-semibold mx-5">Checkout</button>
                </div>
            </div>
        </div>
    );
}

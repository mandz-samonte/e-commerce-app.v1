import React, { createContext, useContext, useMemo, useState } from "react";
import { filter, find, forEach, map, round } from "lodash";

export const FREE_SHIPPING = "free";
export const REGULAR_SHIPPING = "regular";
export const FAST_SHIPPING = "fast";

const CartContext = createContext(null);

export default function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [shipping, setShipping] = useState(FREE_SHIPPING);

    const cartQuantity = useMemo(() => {
        let quantity;
        forEach(cart, (item) => (quantity = quantity + item.quantity));
        return quantity;
    }, [cart]);
    const shippingAmount = useMemo(() => {
        if (shipping === FREE_SHIPPING) return 0;
        if (shipping === REGULAR_SHIPPING) return 7.5;
        if (shipping === FAST_SHIPPING) return 22.5;
    }, [shipping]);
    const subTotal = useMemo(() => {
        let amount = 0;
        forEach(cart, (item) => (amount = amount + item.quantity * item.price));
        return round(amount, 2);
    }, [cart]);
    const totalAmount = useMemo(() => {
        return subTotal + shippingAmount;
    }, [subTotal, shippingAmount]);

    const addToCart = (item) => {
        let itemClone = find(cart, { id: item.id });
        if (itemClone) {
            addQuantity(item);
        } else {
            setCart([...cart, { ...item, quantity: (item.quantity || 0) + 1 }]);
        }
    };

    const removeFromCart = (item) => {
        setCart(filter(cart, (i) => i.id !== item.id));
    };

    const addQuantity = (item) => {
        setCart(map(cart, (i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)));
    };

    const minusQuantity = (item) => {
        setCart(map(cart, (i) => (i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i)));
    };

    const clearCart = () => {
        setCart([]);
    };

    const value = {
        cart,
        subTotal,
        totalAmount,
        shippingAmount,
        shipping,
        clearCart,
        setShipping,
        addToCart,
        removeFromCart,
        addQuantity,
        minusQuantity,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
    return useContext(CartContext);
};

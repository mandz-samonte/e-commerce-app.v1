import { useCart } from "../../providers/CartProvider";
import classNames from "classnames";
import { BiTrash } from "react-icons/bi";
import { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

function NumberInput({ onAdd = () => {}, onMinus = () => {}, value, className }) {
    const [initialValue, setValue] = useState(value || 0);

    const add = () => {
        setValue(initialValue + 1);
        onAdd(initialValue + 1);
    };

    const minus = () => {
        if (initialValue > 1) {
            setValue(initialValue - 1);
            onMinus(initialValue - 1);
        }
    };

    return (
        <div className={classNames("flex rounded-lg border border-zinc-200 text-sm w-fit", className)}>
            <button onClick={minus} className="flex items-center justify-center w-7 h-7">
                <AiOutlineMinus />
            </button>
            <input
                type="number"
                placeholder="0"
                value={initialValue}
                className="w-7 h-7 text-center outline-none remove-input-spinner"
            />
            <button onClick={add} className="flex items-center justify-center w-7 h-7">
                <AiOutlinePlus />
            </button>
        </div>
    );
}

export default function ProductRow({ product }) {
    const { removeFromCart, addQuantity, minusQuantity } = useCart();
    const { title, price, image, quantity } = product;

    return (
        <div className="p-5 w-full flex items-start gap-x-5">
            <img src={image} className="w-28 h-28 rounded-lg bg-zinc-400 flex-shrink-0" />

            <div className="flex flex-col pt-1 w-full">
                <span className="text-lg font-semibold">{title}</span>
                <span className="text-sm text-zinc-400">sm</span>

                <NumberInput
                    onAdd={() => addQuantity(product)}
                    onMinus={() => minusQuantity(product)}
                    value={quantity}
                    className="mt-5"
                />
            </div>

            <div className="flex flex-col pt-1 text-right">
                <span className="text-lg font-semibold">${price * quantity}</span>

                <button
                    onClick={() => removeFromCart(product)}
                    className="flex items-center text-sm text-zinc-400 gap-x-2 mt-2 hover:text-red-500 transition-all"
                >
                    <BiTrash />
                    Remove
                </button>
            </div>
        </div>
    );
}

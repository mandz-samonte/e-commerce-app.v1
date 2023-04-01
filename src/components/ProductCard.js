import { AiOutlineHeart, AiOutlineShareAlt } from "react-icons/ai";
import { BsCart2 } from "react-icons/bs";
import ReactStars from "react-rating-stars-component";
import classNames from "classnames";
import { useCart } from "../providers/CartProvider";

const ProductCard = ({ product, className }) => {
    const { title, description, rating = {}, image, price } = product;
    const { addToCart } = useCart();

    const onAddToCart = () => {
        addToCart(product);
    };

    return (
        <div
            className={classNames(
                "flex flex-col cursor-pointer group h-full hover:scale-105 transition-all duration-300 hover:drop-shadow",
                className
            )}
        >
            <div className="flex bg-white py-10 rounded-lg mb-2">
                <img src={image} className="h-56 mx-auto" />
            </div>
            <div className="flex items-start h-full">
                <div className="flex flex-col p-3 w-full h-full">
                    <span className="mb-1 text-sm font-semibold leading-snug">{title}</span>
                    <span className="mb-5 text-xs text-zinc-600 leading-snug">{description?.substring(0, 50)}...</span>
                    <span className="font-bold mb-1 text-xl rounded-lg mr-auto">${price}</span>
                    <span className="flex items-center mb-5">
                        <ReactStars count={5} value={rating?.rate} isHalf={true} edit={false} />
                        <span className="text-xs text-gray-600 ml-5">{rating?.count}</span>
                    </span>

                    <div className="flex items-center gap-x-2 mt-auto">
                        <button
                            onClick={onAddToCart}
                            className="rounded-full w-10 h-10 flex items-center justify-center bg-primary-yellow transition-all duration-300"
                        >
                            <BsCart2 />
                        </button>
                        <button className="bg-white rounded-full w-10 h-10 flex items-center justify-center transition-all duration-300">
                            <AiOutlineHeart />
                        </button>
                    </div>
                </div>
                {/* <div className="flex flex-col flex-shrink-0 gap-2">
                    <button className="bg-white rounded-full w-10 h-10 flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-primary-yellow transition-all duration-300">
                        <AiOutlineHeart />
                    </button>
                    <button className="bg-white rounded-full w-10 h-10 flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-primary-yellow transition-all duration-300">
                        <AiOutlineShareAlt />
                    </button>
                </div> */}
            </div>
        </div>
    );
};

export default ProductCard;

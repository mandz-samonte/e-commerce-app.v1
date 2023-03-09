import { AiOutlineHeart, AiOutlineShareAlt } from "react-icons/ai";
import { BsCart2 } from "react-icons/bs";
import ReactStars from "react-rating-stars-component";
import classNames from "classnames";

const ProductCard = (props) => {
    return (
        <div className={classNames("flex flex-col p-5 cursor-pointer group", props.className)}>
            <div className="flex bg-white py-10 rounded-lg mb-2">
                <img src={props.image} className="h-56 mx-auto" />
            </div>
            <div className="flex items-start">
                <div className="flex flex-col p-3 w-full">
                    <span className=" mb-5">{props.title}</span>
                    <span className="font-bold mb-5 px-3 py-2 bg-primary-yellow rounded-lg mr-auto">
                        ${props.price}
                    </span>
                    <span className="flex items-center">
                        <ReactStars count={5} value={props.rating?.rate} isHalf={true} edit={false} />
                        <span className="text-xs text-gray-600 ml-5">{props.rating?.count}</span>
                    </span>
                </div>
                <div className="flex flex-col flex-shrink-0 gap-2">
                    <button className="bg-white rounded-full w-10 h-10 flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-primary-yellow transition-all duration-300">
                        <AiOutlineHeart />
                    </button>
                    <button className="bg-white rounded-full w-10 h-10 flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-primary-yellow transition-all duration-300">
                        <AiOutlineShareAlt />
                    </button>
                    <button className="bg-white rounded-full w-10 h-10 flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-primary-yellow transition-all duration-300">
                        <BsCart2 />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;

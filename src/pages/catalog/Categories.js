import React from "react";
import { toNormalCase } from "../../services/helpers";

const Categories = (props) => {
    return (
        <div className="flex flex-col w-[250px] flex-shrink-0 p-5 gap-5">
            <div className="font-bold bg-primary-yellow p-4 rounded-lg text-center text-sm">Shop by Categories</div>
            {props.categories?.map((category, key) => (
                <button key={key} className="p-4 bg-white rounded-lg text-center text-sm">
                    {toNormalCase(category)}
                </button>
            ))}
        </div>
    );
};

export default Categories;

import classNames from "classnames";
import React, { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { toNormalCase } from "../../services/helpers";

const Categories = ({ categories }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const search = useMemo(() => Object.fromEntries([...searchParams]), [searchParams]);

    const selectedCategory = useMemo(() => {
        return searchParams.get("category");
    }, [searchParams]);

    return (
        <div className="flex flex-col w-[250px] flex-shrink-0 gap-5">
            <div className="font-bold my-4 text-sm">Shop by Categories</div>
            {categories?.map((category, key) => (
                <button
                    key={category}
                    onClick={() => {
                        setSearchParams({ ...search, category });
                    }}
                    className={classNames("p-4 bg-white rounded-lg text-center text-sm font-semibold", {
                        "bg-primary-yellow ": category === selectedCategory,
                    })}
                >
                    {toNormalCase(category)}
                </button>
            ))}
        </div>
    );
};

export default Categories;

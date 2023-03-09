import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories, getAll } from "../../api/product";
import ProductCard from "../../components/ProductCard";
import { toNormalCase } from "../../services/helpers";

const Categories = (props) => {
    return (
        <div className="flex mx-auto justify-around bg-white w-full">
            {props.categories?.map((category, key) => (
                <>
                    <Link
                        to={`/catalog?category=${category}`}
                        className="w-full  bg-white flex items-center justify-center"
                        key={key}
                    >
                        {toNormalCase(category)}
                    </Link>
                    {key < 3 && <div className="w-px bg-gray-200 h-32 flex-shrink-0"></div>}
                </>
            ))}
        </div>
    );
};

const Products = (props) => {
    return (
        <div className="flex flex-wrap">
            {props.products?.map((product, key) => (
                <ProductCard key={key} {...product} className="w-1/5" />
            ))}
        </div>
    );
};

const Carousel = () => {
    return <div className="h-96 bg-secondary-blue w-full rounded-lg mt-5"></div>;
};

const Main = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

    const getAllCategories = () => {
        getCategories().then(({ data }) => {
            setCategories(data);
        });
    };

    const getAllProducts = () => {
        getAll().then(({ data }) => {
            setProducts(data);
        });
    };

    useEffect(() => {
        getAllCategories();
        getAllProducts();
    }, []);

    return (
        <div className="container flex flex-col gap-20">
            <Carousel />
            <Categories categories={categories} />
            <div className="w-full flex items-center gap-10">
                <div className="w-full h-px bg-black"></div>
                <h1 className="flex-shrink-0 text-lg font-semibold">Recommended Products for You</h1>
                <div className="w-full h-px bg-black"></div>
            </div>
            <Products products={products} />
        </div>
    );
};

export default Main;

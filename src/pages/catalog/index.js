import axios from "axios";
import React, { useEffect, useState } from "react";

import Categories from "./Categories";
import Products from "./Products";

const CatalogContainer = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

    const getProducts = () => {
        axios.get("https://fakestoreapi.com/products").then(({ data }) => {
            setProducts(data);
        });
    };

    const getCategories = () => {
        axios.get("https://fakestoreapi.com/products/categories").then(({ data }) => {
            setCategories(data);
        });
    };

    useEffect(() => {
        getProducts();
        getCategories();
    }, []);

    return (
        <div className="container flex items-start">
            <Categories categories={categories} />
            <Products products={products} />
        </div>
    );
};

export default CatalogContainer;

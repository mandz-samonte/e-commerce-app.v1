import axios from "axios";
import { orderBy } from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getAll, getByCategory } from "../../api/product";

import Categories from "./Categories";
import Filter from "./Filter";
import Products from "./Products";

const CatalogContainer = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [searchParams] = useSearchParams();
    const category = useMemo(() => searchParams.get("category"), [searchParams]);
    const order = useMemo(() => searchParams.get("order"), [searchParams]);

    const getProducts = () => {
        let request = category ? getByCategory(category) : getAll();
        request
            .then(({ data }) => {
                setProducts(data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getCategories = () => {
        axios.get("https://fakestoreapi.com/products/categories").then(({ data }) => {
            setCategories(data);
        });
    };

    const onSelectOrder = () => {};

    useEffect(() => {
        getProducts();
    }, [category]);

    useEffect(() => {
        switch (order) {
            case "lowest-to-highest":
                setProducts((prevProducts) => orderBy(prevProducts, ["price"], ["asc"]));
                return;
            case "highest-to-lowest":
                setProducts((prevProducts) => orderBy(prevProducts, ["price"], ["desc"]));
                return;
            default:
                getProducts();
                return;
        }
    }, [order]);

    useEffect(() => {
        // getProducts();
        getCategories();
    }, []);

    return (
        <div className="container flex items-start gap-x-10 mt-5 pt-10">
            <Categories categories={categories} />
            <div className="w-full flex flex-col">
                <Filter />

                <Products products={products} />
            </div>
        </div>
    );
};

export default CatalogContainer;

import axios from "axios";

export const getAll = (query = "") => {
    return axios.get(`https://fakestoreapi.com/products?${query}`);
};

export const getProduct = (id, query) => {
    return axios.get(`https://fakestoreapi.com/products/${id}?${query}`);
};

export const getCategories = () => {
    return axios.get(`https://fakestoreapi.com/products/categories`);
};

export const getByCategory = (category) => {
    return axios.get(`https://fakestoreapi.com/products/category/${category}`);
};

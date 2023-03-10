import ProductCard from "../../components/ProductCard";

const Products = ({ products }) => {
    return (
        <div className="grid grid-cols-4 gap-x-5 gap-y-10">
            {products?.map((product) => (
                <ProductCard key={product.id} {...product} className="" />
            ))}
        </div>
    );
};

export default Products;

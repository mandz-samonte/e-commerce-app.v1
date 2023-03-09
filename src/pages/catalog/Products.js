import ProductCard from "../../components/ProductCard";

const Products = (props) => {
    return (
        <div className="flex flex-wrap p-5">
            {props.products?.map((product) => (
                <ProductCard key={product.id} {...product} className="w-1/4" />
            ))}
        </div>
    );
};

export default Products;

import { Product } from "../../../../types/Product";

const ProductName = ({ product }: { product: Product }) => {
  return (
    <div className="flex justify-between items-center w-full ">
      <div className="flex-1 ">
        <h1 className="text-2xl font-bold text-primary mt-2">
          {product?.name}
        </h1>
      </div>
      <div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium hidden lg:flex ${
            product?.inStock
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {product?.inStock ? "In Stock" : "Out of Stock"}
        </span>
      </div>
    </div>
  );
};

export default ProductName;

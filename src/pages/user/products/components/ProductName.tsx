import { Product } from "../../../../types/Product";

const ProductName = ({ product }: { product: Product }) => {
  return (
    <div className="flex justify-between items-center w-full ">
      <div className="flex-1 ">
        <h1 className="text-2xl font-bold text-primary">{product.name}</h1>
        <div className="flex items-center mt-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(product.rating)
                    ? "fill-current"
                    : "fill-none stroke-current"
                }`}
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-gray-600 ml-4">
            {product.rating} ({product.reviews} reviews)
          </span>
        </div>
      </div>
      <div >
      <span
        className={`px-3 py-1 rounded-full text-sm font-medium hidden lg:flex ${
          product.inStock
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
        }`}
      >
        {product.inStock ? "In Stock" : "Out of Stock"}
      </span>
      </div>
      
    </div>
  );
};

export default ProductName;

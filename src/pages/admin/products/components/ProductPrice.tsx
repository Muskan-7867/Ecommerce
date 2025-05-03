import { useSingleProductStore } from "../../../../store/product/Table.store";

const ProductPrice = () => {
  const selectedProduct = useSingleProductStore(
    (state) => state.selectedProduct
  );
  return (
    <div className="mt-8 w-full ">
      <div className="flex">
        <span className="text-3xl font-normal text-gray-900">
          Rs {selectedProduct.price.toFixed(2)}/-
          {selectedProduct.originalPrice && (
            <span className="text-sm line-through ms-2 text-gray-500 font-normal">
              {selectedProduct.originalPrice.toFixed(2)}
            </span>
          )}
        </span>
      </div>
    </div>
  );
};

export default ProductPrice;

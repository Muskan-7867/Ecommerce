import { useSingleProductStore } from "../../../../store/product/Table.store";
import ProductDescAndFeature from "../../../user/products/components/ProductDescAndFeature";
import ProductImage from "../../../user/products/components/ProductImage";
import ProductName from "../../../user/products/components/ProductName";
import ProductPrice from "./ProductPrice";

const SingleProduct = () => {
  const { selectedProduct, setShowSingleProduct } = useSingleProductStore();

  const handleCross = () => {
    setShowSingleProduct(false);
  };

  return (
    <div
      onClick={handleCross}
      className="inset-0 bg-black/20 absolute z-10 flex justify-center items-center backdrop-blur-md"
    >
      <div className="min-h-screen w-full py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
        <div
          onClick={(e) => e.stopPropagation()}
          className="max-w-6xl mx-auto bg-white rounded-xl  overflow-hidden relative"
        >
          <div className="md:flex">
            {/* Left side - product images */}
            <ProductImage product={selectedProduct} />

            <div className="w-full p-4">
              <ProductName product={selectedProduct} />
              <ProductDescAndFeature product={selectedProduct} />
              <ProductPrice />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;

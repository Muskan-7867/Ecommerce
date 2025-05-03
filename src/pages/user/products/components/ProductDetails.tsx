import { useEffect, useState } from "react";
import ProductDescAndFeature from "./ProductDescAndFeature";
import ProductName from "./ProductName";
import { Product } from "../../../../types/Product";
import ProductPriceAndButton from "./ProductPriceAndButton";

const ProductDetails = ({ product }: { product: Product }) => {
  const [isPresentInCart, setIsPresentInCart] = useState(false);
  const [cartCountValue] = useState(0);
  const [currentId, setCurrentId] = useState("");
  const [refreshCart, setRefreshCart] = useState(false);

  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  return (
    <div className="w-full p-4">
      <ProductName product={product} />
      <ProductDescAndFeature product={product} />
      <ProductPriceAndButton
        product={product}
        IsPresentInCart={isPresentInCart}
        setIsPresentInCart={setIsPresentInCart}
        cartCountValue={cartCountValue}
        currentId={currentId}
        setCurrentId={setCurrentId}
        refreshCart={refreshCart}
        setRefreshCart={setRefreshCart}
      />
    </div>
  );
};

export default ProductDetails;

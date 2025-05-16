import { useEffect } from "react";
import useCart from "../../../../hooks/useCart";
import { Product } from "../../../../types/Product";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";

interface ProductPriceProps {
  product: Product;
  IsPresentInCart: boolean;
  setIsPresentInCart: React.Dispatch<React.SetStateAction<boolean>>;
  cartCountValue?: number;
  currentId?: string;
  setCurrentId?: React.Dispatch<React.SetStateAction<string>>;
  refreshCart?: boolean;
  setRefreshCart?: React.Dispatch<React.SetStateAction<boolean>>;
}
const ProductPriceAndButton = ({
  IsPresentInCart,
  setIsPresentInCart,
  cartCountValue = 0,
  currentId = "",
  setCurrentId,
  setRefreshCart,
  refreshCart = false,
  product
}: ProductPriceProps) => {
  const { RemoveProductFromCart, addProductToCart } = useCart();

  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem("productIds");
    const arrayOfProdId = JSON.parse(data!);
    if (arrayOfProdId) {
      for (let i = 0; i < arrayOfProdId.length; i++) {
        if (arrayOfProdId[i] == product._id) {
          setIsPresentInCart(true);
        }
      }
    }
  }, [
    IsPresentInCart,
    cartCountValue,
    currentId,
    setIsPresentInCart,
    product._id
  ]);

  useEffect(() => {
    if (setCurrentId) {
      setCurrentId(product._id.toString());
    }
  }, [product._id, setCurrentId]);

  const handleCartAction = () => {
    if (IsPresentInCart) {
      RemoveProductFromCart(product._id);
      setIsPresentInCart(false);
    } else {
      addProductToCart(product._id);
      setIsPresentInCart(true);
    }
    if (setRefreshCart) {
      setRefreshCart(!refreshCart);
    }
  };

  const handleBuy = () => {
    navigate(`/checkout/${product._id}`);
    console.log("buy ")
  };

  return (
    <div className="mt-8 w-full ">
      <div className="flex">
        <span className="text-3xl font-normal text-gray-900">
          <div className="flex items-center">
            <LiaRupeeSignSolid />
            <h1 className="text-sm">{product.price.toFixed(2)} /-</h1>
          </div>
          {product.originalPrice && (
            <span className="text-sm line-through  text-gray-500 font-normal">
              {product.originalPrice.toFixed(2)}
            </span>
          )}
        </span>
      </div>

      <div className="mt-6 space-x-4 w-full flex justify-start">
        <button
          onClick={handleCartAction}
          className=" bg-primary text-md text-white py-2 px-4 rounded-lg font-medium focus:outline-none   transition-colors"
        >
          {IsPresentInCart ? "Remove From Cart" : "Add To Cart"}
        </button>
        <button
          onClick={handleBuy}
          className=" bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-8 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors"
        >
          Buy Now
        </button>
      </div>

      <div className="mt-6 flex justify-start text-sm text-gray-500 ">
        <svg
          className="h-5 w-5 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        Usually ships within 2-3 business days
      </div>
    </div>
  );
};

export default ProductPriceAndButton;

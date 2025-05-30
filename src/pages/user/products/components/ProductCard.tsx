import { useNavigate } from "react-router-dom";
import useCart from "../../../../hooks/useCart";
import { useEffect, useState } from "react";
import useCartStore from "../../../../store/Cart/Cart.store";
import { Product } from "../../../../types/Product";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { FaCartPlus } from "react-icons/fa";

const ProductCard = ({ product }: { product: Product }) => {
  const [isPresentInCart, setIsPresentInCart] = useState<boolean>(false);
  const [refreshCart, setRefreshCart] = useState<boolean>(false);
  const [currentId, setCurrentId] = useState<string>(product?._id);
  const { addProductToCart, RemoveProductFromCart } = useCart();
  const navigate = useNavigate();
  const { cartCountValue } = useCartStore();

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
  }, [isPresentInCart, cartCountValue, currentId, product]);

  useEffect(() => {
    setCurrentId(product?._id);
  }, [product]);

  return (
    <div
      key={product.name}
      onClick={() => navigate(`/products/${product._id}`)}
      className="bg-white p-3 rounded-md flex flex-col w-full sm:w-[15rem] hover:shadow-sm transition-shadow duration-300 mx-auto sm:mx-4 cursor-pointer"
    >
      {/* Image Container */}
      <div className="aspect-square w-full overflow-hidden flex items-center justify-center ">
        <img
          src={product.images?.[0]?.url}
          alt={product.name}
          className="w-full h-full object-cover  p-2"
        />
      </div>

      {/* Product Info */}
      <div className="mt-4 sm:mt-6 flex-grow overflow-hidden">
        <h2 className="text-sm sm:text-base font-semibold line-clamp-1">
          {product.name}
        </h2>
        <p className="text-gray-600 text-xs sm:text-sm line-clamp-2 mt-1">
          {product.description}
        </p>
      </div>

      {/* Price and Add to Cart */}
      <div className="flex justify-between items-center mt-3 sm:mt-4">
        <div className="text-amber-600 font-bold text-sm sm:text-base">
          <div className="flex items-center">
            <LiaRupeeSignSolid className="font-semibold text-lg sm:text-xl" />
            <p>{product.price}</p>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (isPresentInCart) {
              setRefreshCart(!refreshCart);
              RemoveProductFromCart(product._id);
              setIsPresentInCart(false);
            } else {
              setRefreshCart(!refreshCart);
              addProductToCart(product._id);
              setIsPresentInCart(true);
            }
          }}
          className={`flex items-center justify-center rounded-full p-2 transition-colors cursor-pointer ${
            isPresentInCart
              ? "bg-gray-400 text-white  "
              : "bg-primary text-white border "
          }`}
          aria-label={isPresentInCart ? "Remove from cart" : "Add to cart"}
        >
          {isPresentInCart ? (
            <FaCartPlus className="text-sm sm:text-base " />
          ) : (
            <FaCartPlus className="text-sm sm:text-base" />
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

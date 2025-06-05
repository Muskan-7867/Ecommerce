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
      className="bg-white p-3 rounded-md flex flex-col w-full max-w-[180px] sm:max-w-[220px] hover:shadow-sm transition-shadow duration-300 mx-auto cursor-pointer"
    >
      {/* Image Container - Fixed aspect ratio */}
      <div className="relative pb-[100%] w-full overflow-hidden rounded-sm">
        <img
          src={product.images?.[0]?.url}
          alt={product.name}
          className="absolute top-0 left-0 w-full h-full object-contain p-2"
          loading="lazy"
        />
      </div>

      {/* Product Info */}
      <div className="mt-3 flex-grow overflow-hidden">
        <h2 className="text-xs sm:text-sm font-semibold line-clamp-1">
          {product.name}
        </h2>
        <p className="text-gray-600 text-xs line-clamp-2 mt-1">
          {product.description}
        </p>
      </div>

      {/* Price and Add to Cart */}
      <div className="flex justify-between items-center mt-2">
        <div className="text-amber-600 font-bold text-xs sm:text-sm">
          <div className="flex items-center">
            <LiaRupeeSignSolid className="font-semibold text-base" />
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
          className={`flex items-center justify-center rounded-full p-1.5 sm:p-2 text-lg transition-colors cursor-pointer ${
            isPresentInCart
              ? "bg-gray-100 text-primary "
              : " text-primaryr"
          }`}
          aria-label={isPresentInCart ? "Remove from cart" : "Add to cart"}
        >
          <FaCartPlus className="text-xs sm:text-sm" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
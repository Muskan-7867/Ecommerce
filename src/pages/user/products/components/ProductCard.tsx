import { useNavigate } from "react-router-dom";
import useCart from "../../../../hooks/useCart";
import { useEffect, useState } from "react";
import useCartStore from "../../../../store/Cart/Cart.store";
import { Product } from "../../../../types/Product";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { FaCartPlus } from "react-icons/fa";

const ProductCard = ({ product }: { product: Product }) => {
  const [isPresentInCart, setIsPresentInCart] = useState<boolean>(false);
  const { addProductToCart, RemoveProductFromCart } = useCart();
  const navigate = useNavigate();
  const { cartCountValue } = useCartStore();

  useEffect(() => {
    const data = localStorage.getItem("productIds");
    const arrayOfProdId = data ? JSON.parse(data) : [];
    setIsPresentInCart(arrayOfProdId.includes(product._id));
  }, [cartCountValue, product._id]);

  const handleCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPresentInCart) {
      RemoveProductFromCart(product._id);
      setIsPresentInCart(false);
    } else {
      addProductToCart(product._id);
      setIsPresentInCart(true);
    }
  };

  return (
    <div
      onClick={() => navigate(`/products/${product._id}`)}
      className="bg-white p-4 rounded-md flex flex-col w-full  max-w-[26rem] xs:max-w-[180px] sm:max-w-[200px] md:max-w-[18rem] lg:max-w-[18rem] hover:shadow-sm transition-shadow duration-300 cursor-pointer gap-1 sm:gap-2"
    >
  
      {/* Image Container */}
      <div className="relative pb-[100%] w-full overflow-hidden rounded-sm group">
        {/* Main Image (applies hover effect to ALL products) */}
        <img
          src={product.images?.[0]?.url}
          alt={product.name}
          className="absolute top-0 left-0 w-full h-full object-contain p-2 
             transition-all duration-300 ease-in-out
              "
          loading="lazy"
        />

        {/* Second Image (only for multi-image products) */}
        {product.images?.length > 1 && (
          <img
            src={product.images[1].url}
            alt={product.name}
            className="absolute top-0 left-0 w-full h-full object-contain p-2 
               opacity-0 group-hover:opacity-100 
               transition-all duration-300 ease-in-out"
            loading="lazy"
          />
        )}
      </div>

      {/* Product Info */}
      <div className="mt-2 sm:mt-3 flex-grow overflow-hidden">
        <h2 className="text-xs xs:text-sm sm:text-base font-semibold line-clamp-1">
          {product.name}
        </h2>
        <p className="text-gray-600 text-[0.65rem] xs:text-xs sm:text-sm line-clamp-2 mt-0.5 sm:mt-1">
          {product.description}
        </p>
      </div>

      {/* Price and Add to Cart */}
      <div className="flex justify-between items-center mt-1 sm:mt-2">
        <div className="text-amber-600 font-bold text-xs xs:text-sm sm:text-base">
          <div className="flex items-center">
            <LiaRupeeSignSolid className="font-semibold text-sm xs:text-base" />
            <p>{product.price}/-</p>
          </div>
        </div>
        <button
          onClick={handleCartClick}
          className={`flex items-center justify-center rounded-full p-1 xs:p-1.5 sm:p-2 text-sm xs:text-base transition-colors cursor-pointer ${
            isPresentInCart ? "bg-gray-100 text-primary" : "text-primary"
          }`}
          aria-label={isPresentInCart ? "Remove from cart" : "Add to cart"}
        >
          <FaCartPlus className="text-lg xs:text-sm sm:text-base" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

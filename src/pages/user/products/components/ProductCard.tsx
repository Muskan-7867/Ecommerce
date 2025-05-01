import { useNavigate } from "react-router-dom";
import useCart from "../../../../hooks/useCart";
import { useEffect, useState } from "react";
import useCartStore from "../../../../store/Cart/Cart.store";
import { Product } from "../../../../types/Product";

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
      className="bg-white p-3 rounded-md flex flex-col w-[15rem] shadow-sm hover:shadow-2xl transition-shadow duration-300 mx-4   "
    >
      <div className="aspect-square w-full flex products-center justify-center h-[140px]">
        <img
          src={product.images?.[0]?.url}
          alt={product.name}
          className="w-[14rem] h-[10rem] object-contain cursor-pointer p-2"
        />
      </div>
      <div className="mt-12 flex-grow overflow-hidden">
        <h2 className="text-sm font-semibold line-clamp-1">{product.name}</h2>
        <p className="text-gray-600 text-xs line-clamp-2 mt-1">
          {product.description}
        </p>
      </div>
      <div className="flex justify-between products-center mt-2">
        <p className="text-amber-600 font-bold text-sm">${product.price}</p>
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
          className="bg-primary text-white text-xs rounded px-2 py-2 hover:bg-primary-dark transition-colors cursor-pointer"
        >
          {isPresentInCart ? "Remove From Cart" : "Add To Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

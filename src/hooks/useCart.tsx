import { useEffect, useState } from "react";
import useCartStore from "../store/Cart/Cart.store";

const useCart = () => {
  // const [productId, setProductId] = useState<string[]>();
  const [cartCount, setCartCount] = useState<number>(0);
  const [reFetch, setreFetch] = useState<boolean>(false);
  const { increaseCartCount, decreaseCartCount } = useCartStore();

  useEffect(() => {
    const id = getCartProductIds();
    setCartCount(id.length);
  }, [reFetch]);

  const addProductToCart = (id: string) => {
    const prevProductId = localStorage.getItem("productIds");
    if (prevProductId) {
      const arrayProductId = JSON.parse(prevProductId);
      const updated = [...arrayProductId, id];
      localStorage.setItem("productIds", JSON.stringify(updated));
      setCartCount(updated.length);
      setreFetch(!reFetch);
      increaseCartCount();
    } else {
      localStorage.setItem("productIds", JSON.stringify([id]));
      setreFetch(!reFetch);
      increaseCartCount();
    }
  };

  const RemoveProductFromCart = (productId: string) => {
    decreaseCartCount();
    console.log("remove called", productId);
    const storedIds = localStorage.getItem("productIds");
    if (!storedIds) return;
    const ids = JSON.parse(storedIds);
    const newId = ids.filter((id: string) => id !== productId);
    localStorage.setItem("productIds", JSON.stringify(newId));
    setCartCount(newId.length);
    setreFetch(!reFetch);
  };

  const getCartProductIds = () => {
    const prodIds = window.localStorage.getItem("productIds");
    if (!prodIds) return [];
    return JSON.parse(prodIds);
  }

  return {
    addProductToCart,
    RemoveProductFromCart,
    cartCount,
    getCartProductIds,

  };
};

export default useCart;

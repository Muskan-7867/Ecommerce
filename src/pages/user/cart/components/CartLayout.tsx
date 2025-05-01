import { useEffect, useState } from "react";
import { Product } from "../../../../types/Product";
import CartDetails from "./CartDetails";
import { useQuery } from "@tanstack/react-query";
import { getCartProductIdQuery } from "../../../../services/queries";
import cartloader from "../../../../../public/animations/cartLoader.json";
import Lottie from "lottie-react";

const CartLayout = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const CartProdId = localStorage.getItem("productIds");
  const productIds = CartProdId ? JSON.parse(CartProdId) : [];
  const {
    data: cartproducts,
    isLoading,
    isError
  } = useQuery(getCartProductIdQuery(productIds));

  useEffect(() => {
    if (cartproducts) {
      setProducts(cartproducts);
    }
  }, [cartproducts]);

  const handleDelete = (id: string) => {
    const existingRaw = localStorage.getItem("productIds");
    const existing: string[] = existingRaw ? JSON.parse(existingRaw) : [];
    if (!existing.includes(id)) {
      console.warn("⚠️ ID not found in localStorage array!");
      return;
    }

    const updated = existing.filter((prodid) => prodid !== id);
    localStorage.setItem("productIds", JSON.stringify(updated));
    setProducts((prev) => prev.filter((product) => product._id !== id));
  };

  return (
    <div className="grid grid-cols-12 gap-4 mt-18 min-h-screen">
      <div className="lg:col-span-8  col-span-12 p-6">
        <h1 className="text-xl font-bold font-serif mb-4">Cart Products</h1>
        {isLoading && (
          <div className="w-full flex flex-col items-center justify-center ">
            <Lottie
              animationData={cartloader}
              className=" w-[12rem] h-[12rem] lg:w-[25rem] lg:h-[25rem]"
            />
            <p className="text-xl font-bold">Loading Cart Products....</p>
          </div>
        )}

        {isError && <p className="text-red-500"></p>}
        <ul className="space-y-4">
          {products?.map((product) => (
            <div>
              <li key={product._id} className="p-4 rounded-lg shadow">
                <CartDetails product={product} onDelete={handleDelete} />
              </li>
            </div>
          ))}
        </ul>
      </div>

      <div className="bg-red-100 lg:col-span-4 col-span-12 p-6">
        <h1 className="text-xl font-bold font-serif mb-4">Cart Summary</h1>
      </div>
    </div>
  );
};

export default CartLayout;

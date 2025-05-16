import { useEffect, useState } from "react";
import SingleProductPage from "./SingleProductPage";
import CartSummary from "../../cart/components/CartSummary";
import { useQuery } from "@tanstack/react-query";
import { Product } from "../../../../types/Product";
import { getProductByIdQuery } from "../../../../services/queries";
import { useParams } from "react-router-dom";
import useCurrentUserStore from "../../../../store/User/user.store";

const CheckOut = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [quantities, setQuantities] = useState<{ [id: string]: number }>({});
  const { reFetch } = useCurrentUserStore();
  
  const { id } = useParams<{ id: string }>();
  const { data: singleproduct } = useQuery<Product>(getProductByIdQuery(id));

  useEffect(() => {
    if (singleproduct) {
      setProducts([singleproduct]);
      setQuantities((prev) => ({
        ...prev,
        [singleproduct._id]: prev[singleproduct._id] || 1,
      }));
    }
  }, [singleproduct]);

  useEffect(() => {
    window.scrollTo(0, 0);
    reFetch();
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 px-4 sm:px-6 lg:px-8 py-8 min-h-screen  mt-18 ">
      <div className="lg:col-span-8 col-span-12">
        <h2 className="text-xl sm:text-2xl font-semibold mb-2">Checkout</h2>
        <SingleProductPage quantities={quantities} setQuantities={setQuantities} />
      </div>

      <div className="lg:col-span-4 col-span-12">
        <CartSummary products={products} quantities={quantities} />
      </div>
   
    </div>
  );
};

export default CheckOut;

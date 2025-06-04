import { useEffect, useState } from "react";
import SingleProductPage from "./SingleProductPage";
import { useQuery } from "@tanstack/react-query";
import { Product } from "../../../../types/Product";
import { getProductByIdQuery } from "../../../../services/queries";
import { useParams } from "react-router-dom";
import useCurrentUserStore from "../../../../store/User/user.store";
import PaymentSummaryForBuy from "../../cart/components/PaymentSummaryForBuy";

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
    <div className="min-h-screen  py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-full mx-auto mt-18">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
          Checkout
        </h2>

        <div className="flex flex-col gap-6">
          {/* Product Section */}
          <div className="bg-white rounded-lg shadow  p-6">
            <SingleProductPage
              quantities={quantities}
              setQuantities={setQuantities}
            />
          </div>

          {/* Payment Summary Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <PaymentSummaryForBuy
              products={products}
              quantities={quantities}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;

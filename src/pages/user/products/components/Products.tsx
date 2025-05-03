import Lottie from "lottie-react";
import { Product } from "../../../../types/Product";
import ProductCard from "./ProductCard";
import ProductNotFound from "../../../../../public/animations/notFound.json";

import { parseAsInteger, useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { getFilteredProducts } from "../../../../services/fetchers";

const Products = () => {
  const [products, setProducts] = useState<Product[] | []>([]);
  const [search] = useQueryState("search");

  const [category] = useQueryState("category", {
    defaultValue: "all"
  });
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));
  const [limit] = useQueryState("limit", parseAsInteger.withDefault(9));
  const [minPrice] = useQueryState("minPrice",parseAsInteger.withDefault(0));
  const [maxPrice] = useQueryState("maxPrice",parseAsInteger.withDefault(100000)
  );
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [products]);
  useEffect(() => {
    fetchFilterProducts();
  }, [page, limit, minPrice, maxPrice, category, search]);

  const fetchFilterProducts = async () => {
    const data = await getFilteredProducts(
      page,
      limit,
      minPrice,
      maxPrice,
      category,
      search
    );
    console.log("from filtered", data, category);
    setProducts(data.products);
  };

  // if (isLoading) {
  //   return (
  //     <div className="w-full min-h-[50rem] flex flex-col items-center justify-center   ">
  //       <Lottie
  //         animationData={loader}
  //         className=" w-[18rem] h-[18rem] lg:w-[25rem] lg:h-[25rem]"
  //       />
  //       <p className="text-4xl font-semibold ">Loading Products....</p>
  //     </div>
  //   );
  // }

  // if (isError) {
  //   return (
  //     <div className="min-h-screen flex justify-center items-center">
  //       <div className="text-red-500">
  //         Error loading products. Please try again later.
  //       </div>
  //     </div>
  //   );
  // }
  return (
    <div className="">
      {products?.length > 0 ? (
        <div className="grid grid-cols-12  gap-4 sm:gap-6 justify-center items-center  ">
          {products?.map((product: Product) => (
            <div className="col-span-12 lg:col-span-4  sm:col-span-6 flex justify-center items-center">
              <ProductCard key={product._id} product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full flex flex-col justify-center items-center h-[50rem] ">
          <Lottie
            animationData={ProductNotFound}
            className=" w-[18rem] h-[18rem] lg:w-[25rem] lg:h-[25rem]"
          />
          <p className="text-4xl font-bold font-serif">Product Not Found</p>
        </div>
      )}
    </div>
  );
};

export default Products;

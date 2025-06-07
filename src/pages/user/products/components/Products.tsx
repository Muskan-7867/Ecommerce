
import { Product } from "../../../../types/Product";
import ProductCard from "./ProductCard";
import { parseAsInteger, useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { getFilteredProducts } from "../../../../services/fetchers";
import ProductCardShimmer from "./ProductCardShimmer";

const Products = () => {
  const [products, setProducts] = useState<Product[] | []>([]);
  const [search] = useQueryState("search");
  const [category] = useQueryState("category", { defaultValue: "all" });
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));
  const [limit] = useQueryState("limit", parseAsInteger.withDefault(9));
  const [minPrice] = useQueryState("minPrice", parseAsInteger.withDefault(0));
  const [maxPrice] = useQueryState(  "maxPrice",  parseAsInteger.withDefault(0));
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [products]);

  useEffect(() => {
    fetchFilterProducts();
  }, [page, limit, minPrice, maxPrice, category, search]);

const fetchFilterProducts = async () => {
  setLoading(true);
  try {
    const data = await getFilteredProducts(
      page,
      limit,
      minPrice,
      maxPrice,
      category,
      search
    );
    setProducts(data.products);
  } catch (error) {
    console.error("Failed to fetch products:", error);
  } finally {
    setLoading(false);
  }
};
  return (
  <div className="">
    {loading ? (
      <div className="grid grid-cols-12 gap-4 sm:gap-6 justify-center items-center">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div key={idx} className="col-span-12 lg:col-span-4 sm:col-span-6 flex justify-center items-center">
            <ProductCardShimmer/>
          </div>
        ))}
      </div>
    ) : products?.length > 0 ? (
      <div className="grid grid-cols-12 gap-4 sm:gap-6 justify-center items-center">
        {products.map((product: Product) => (
          <div key={product._id} className="col-span-12 lg:col-span-4 sm:col-span-6 flex justify-center items-center">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    ) : (
      <div className="w-full flex flex-col justify-center items-center h-[50rem]">
        {/* Optional Lottie fallback if no products */}
        <p className="text-4xl font-bold font-serif">Product Not Found</p>
      </div>
    )}
  </div>
);
}

export default Products;

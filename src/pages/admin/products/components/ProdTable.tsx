import { useEffect, useState } from "react";
import Table from "../../../../components/common/admin/Table";
import ProductFilterBar from "./ProductFilterbar";
import { Product } from "../../../../types/Product";
import { parseAsInteger, useQueryState } from "nuqs";
import { getFilteredProducts } from "../../../../services/fetchers";
import Pagination from "../../../user/products/components/Pagination";

const ProdTable = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search] = useQueryState("search");
  const [category] = useQueryState("category", { defaultValue: "all"});
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));
  const [limit] = useQueryState("limit", parseAsInteger.withDefault(20));
  const [minPrice] = useQueryState("minPrice", parseAsInteger.withDefault(0));
  const [maxPrice] = useQueryState("maxPrice",parseAsInteger.withDefault(100000));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [products]);

  useEffect(() => {
    fetchFilterProducts();
  }, [search, category]);

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

  // Table columns definition
  const columns = [
    {label: "Product Image",key: "images" as const},
    { label: "Product Name", key: "name" as const },
    { label: "Price", key: "price" as const },
    { label: "Original Price", key: "originalPrice" as const },
    { label: "InStock", key: "inStock" as const },
    { label: "Action", key: "action" as const, renderData: () => (
        <button className="text-black font-bold text-2xl hover:text-gray-800">
          ⋮
        </button>
      )
    }
  ];

  return (
    <>
      <ProductFilterBar/>
         <Table columns={columns} data={products ?? []} />

        <Pagination totalProducts={30} productPerPage={5} />
    </>
  );
};

export default ProdTable;

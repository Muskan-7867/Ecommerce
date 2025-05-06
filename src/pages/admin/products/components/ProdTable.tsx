import { useEffect } from "react";
import Table from "../../../../components/common/admin/Table";
import ProductFilterBar from "./ProductFilterbar";
import { parseAsInteger, useQueryState } from "nuqs";
import Pagination from "../../../user/products/components/Pagination";
import { useQuery } from "@tanstack/react-query";
import { getFilteredProdQuery } from "../../../../services/queries";

const ProdTable = () => {
  const [search] = useQueryState("search", { defaultValue: "" });
  const [category] = useQueryState("category", { defaultValue: "all" });

  const [page] = useQueryState("page", parseAsInteger.withDefault(1));
  const [limit] = useQueryState("limit", parseAsInteger.withDefault(10));
  const [minPrice] = useQueryState("minPrice", parseAsInteger.withDefault(0));
  const [maxPrice] = useQueryState("maxPrice", parseAsInteger.withDefault(100000));

  const { data, isLoading, isError } = useQuery(
    getFilteredProdQuery(page, limit, minPrice, maxPrice, category, search)
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [data]);

  // Table columns definition
  const columns = [
    { label: "Product Image", key: "images" as const },
    { label: "Product Name", key: "name" as const },
    { label: "Price", key: "price" as const },
    { label: "Original Price", key: "originalPrice" as const },
    { label: "InStock", key: "inStock" as const },
    {
      label: "Action",
      key: "action" as const,
      renderData: () => (
        <button className="text-black font-bold text-2xl hover:text-gray-800">
          ⋮
        </button>
      )
    }
  ];

  return (
    <>
      <ProductFilterBar />
      {isLoading && <p>Loading Products....</p>}
      {isError && <p>Error Loading Products....</p>}
      <Table columns={columns} data={data?.products ?? []} />
      <Pagination totalProducts={data?.ProductCount} productPerPage={5} />
    </>
  );
};

export default ProdTable;
